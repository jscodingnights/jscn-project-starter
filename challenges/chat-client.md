# Chat Client 
Create an app to chat with fellow JSCN attendees.

## Challenge Spec

Chatters can:

* Update their username
* See a list of fellow chatters
* Send and receive messages

## API Documentation

### Chat Server URL: [https://jscn.herokuapp.com](https://jscn.herokuapp.com)

When connecting via Socket.IO, you can leave off the "https://" bit. 

#### Chat Monitor
To see a log of server activity, to know if you are successfully connecting and such, go to:
* local: [http://localhost:3001/api/chat/](http://localhost:3001/api/chat/index.html)
* remote: [https://jscn.herokuapp.com/api/chat](https://jscn.herokuapp.com/api/chat)

[See note about alternative `action` event syntax below](#alternative-action-event-syntax).

### Step 1: Connecting to the Server

Using the URL above, establish a socket connection.

#### React Native

```javascript
// Be sure to use require, as import is hoisted.  The if needs to come first as well.  Just... don't change these lines... :)
if (!window.navigator.userAgent) {
  // Fix socket.io check
  window.navigator.userAgent = 'react-native';
}

const io = require('socket.io-client/socket.io');
const socket = io('jscn.herokuapp.com', { jsonp: false, transports: ['websocket'] });
```

#### Web

```javascript
import io from 'socket.io-client';
const socket = io('jscn.herokuapp.com');
```

`socket` has two methods of importance.  `emit` and `on` which send and listen to events respectively.  When any event is dispatched corresponding to the event name given to `on`, the callback is executed with the included payload.

When you first connect, your username is set to "Anonymous".  This can be changed (see Step 4).

### Step 2: Sending Messages

```javascript
const messageEventData = { 
    message: { 
        text: 'Hello World!' 
    }
};

socket.emit('CREATE_MESSAGE', messageEventData);
```

>**IMPORTANT** When you emit a `CREATE_MESSAGE` event, you will not receive the corresponding `RECEIVE_MESSAGE` event.  That is, a client is responsible for displaying its own messages and need not wait for a socket response before doing so.

### Step 3: Receiving Messages

```javascript
const appState = {
    messages: []
};

socket.on('RECEIVE_MESSAGE', (incomingMessage) => {
    // incomingMessage ==> {
    //     type: 'RECEIVE_MESSAGE',
    //     message: {
    //         text: 'Message body text',
    //         author: {
    //             username: 'User Name'         
    //         },
    //         date: 1459693594853 // Epoch
    //     }
    // }
    
    appState.messages.push(incomingMessage.message);
});
```

### Step 4: Updating Your User Profile

When you first connect, you are assigned a username of "Anonymous".  You can change this using the event `UPDATE_USER` so that your name is sent along with any messages you create.

When you successfully update your user, an event will be sent back of the type `RECEIVE_USER` to provide the full state of the user that the server has.  You can use this to sync your local user state with that of the server.

```javascript
const userData = {
    user: {
        username: 'Sally Sue'
    }
};

// Receive the server's state of your current user info
socket.on('RECEIVE_USER', (incomingMessage) => {
    // incomingMessage ==> {
    //     type: 'RECEIVE_USER',
    //     user: {
    //         username: 'Sally Sue',
    //         created: 1459693594853 // Epoch
    //     }
    // }
    
    // Update local user state
    userData.user = incomingMessage.user;
});

// Give the server an update of your user details
socket.emit('UPDATE_USER', userData);
```

### Step 5: Displaying Other Members

When you first connect, and whenever a user joins, leaves, or changes their profile data, the entire list of active users is broadcasted via `RECEIVE_MEMBERS`.  This is heavy-handed obviously, but a nice simplification. Rather than trying to make individual user updates locally, simply discard your entire local state of users and update with the state given.

```
const appState = {
    members: []
};

socket.on('RECEIVE_MEMBERS', (incomingMessage) => {
    // incomingMessage ==> {
    //     type: 'RECEIVE_MEMBERS',
    //     members: [{
    //         username: 'Anonymous'
    //     },{
    //         username: 'Sally Sue',
    //         created: 1459693594853 // Epoch
    //     }]
    // }

    // Blast away current state and re-render
    appState.members = incomingMessage.members;
});
```


## Alternative `action` event syntax

All events can also be listened to, or emitted, via a unified `action` event where the payload contains an object with a `type` property corresponding to the event type.  

This is because Socket.IO does not support wildcard matching, and if you wanted to have a single event handler receive every event, that'd be otherwise not possible without a plugin.

This is choice also makes the use of [Redux-socket.io](https://github.com/itaylor/redux-socket.io) possible if you choose.

```javascript
// Receive all action types
socket.on('action', (incomingMessage) => {
    switch (incomingMessage.type) {
        case 'RECEIVE_USER':
            // ...
            break;
        // ...
    }
});

// Single emit example using 'action'
socket.emit('action', {
    type: 'CREATE_MESSAGE',
    message: {
        text: 'Hello world!'
    }
});
```




