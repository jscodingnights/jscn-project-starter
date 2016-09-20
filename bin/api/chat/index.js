'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var express = require('express');

function emit(socket, name, data) {
  console.log('EMITTING', name, data);

  socket.emit('action', Object.assign({}, data, {
    type: name
  }));
  socket.emit(name, data);
}

function on(socket, name, cb) {
  socket.on(name, cb);
  socket.on('action', function (data) {
    if (data.type === name) {
      cb(data);
    }
  });
}

// Chatroom

// members which are currently connected to the chat
var members = [];
var usernameNum = 0;

exports.default = function (io) {
  io.on('connection', function (socket) {
    console.log('connected!');

    socket.user = {
      username: 'Anonymous',
      created: new Date().getTime()
    };

    // add the client's username to the global list
    members.push(socket.user);

    emit(socket, 'RECEIVE_MEMBERS', { members: members });
    emit(socket.broadcast, 'RECEIVE_MEMBERS', { members: members });
    emit(socket.broadcast, 'MEMBER_JOIN', { user: socket.user });

    // when the client emits 'new message', this listens and executes
    on(socket, 'CREATE_MESSAGE', function (data) {
      var message = data && data.message;

      Object.assign(message, {
        text: message.text,
        author: socket.user || { username: 'Anonymous' },
        date: new Date().getTime()
      });

      // we tell the client to execute 'new message'
      socket.broadcast.emit('action', { type: 'RECEIVE_MESSAGE', message: message });
      socket.broadcast.emit('RECEIVE_MESSAGE', { type: 'RECEIVE_MESSAGE', message: message });
    });

    // when the client emits 'UPDATE_USER', this listens and executes
    on(socket, 'UPDATE_USER', function (event) {
      console.log(event);
      if (!event || !event.user || !event.user.username) {
        return;
      }

      var userUpdate = {
        username: event.user.username
      };

      var oldUser = Object.assign({}, socket.user);
      var user = Object.assign(socket.user, userUpdate);

      emit(socket, 'RECEIVE_USER', { user: user });
      emit(socket.broadcast, 'USER_UPDATE', { oldUser: oldUser, user: user });
      emit(socket, 'RECEIVE_MEMBERS', { members: members });
      emit(socket.broadcast, 'RECEIVE_MEMBERS', { members: members });
    });

    on(socket, 'disconnect', function () {
      members = members.filter(function (user) {
        return user !== socket.user;
      });

      // echo globally that this client has left
      emit(socket.broadcast, 'MEMBER_LEAVE', { user: socket.user });
      emit(socket.broadcast, 'RECEIVE_MEMBERS', { members: members });
    });
  });

  var router = express.Router();

  router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  router.get('/' + (process.env.ADMIN_ROUTE || 'admin'), function (req, res) {
    res.sendFile(__dirname + '/admin.html');
  });

  router.post('/', function (req, res) {
    if (req.body && req.body.author && req.body.text) {
      messages.push(req.body);
    }
    res.json(req.body);
  });

  return router;
};