'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJsonServer = exports.readOnlyRoute = exports.denied = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonServer = require('json-server');

var _jsonServer2 = _interopRequireDefault(_jsonServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var denied = exports.denied = function denied(req, res) {
    return res.send(403, 'This endpoint is read/create (GET)');
};
var readOnlyRoute = exports.readOnlyRoute = function readOnlyRoute(methods) {
    var router = _express2.default.Router();
    methods.forEach(function (m) {
        return router[m]('/', denied);
    });
    return router;
};
var createJsonServer = exports.createJsonServer = function createJsonServer(db) {
    return function (custom) {
        var server = _jsonServer2.default.create();
        var router = _jsonServer2.default.router(db);
        var middlewares = _jsonServer2.default.defaults();

        server.use(middlewares);
        custom(server);
        server.use(router);

        return server;
    };
};