'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var bodyKeyExists = function bodyKeyExists(req) {
    return function (key) {
        return function (collection) {
            var id = req.body[key];
            return (0, _lodash.find)(collection, { id: id });
        };
    };
};

var setBody = function setBody(values) {
    return function (req) {
        req.body = _extends({}, req.body, values);
        return req;
    };
};

exports.default = function (db) {
    return function (req, res, next) {
        if (req.method === 'POST') {
            setBody({
                voterId: req.ip,
                createdOn: new Date()
            })(req);

            if (!bodyKeyExists(req)('candidateId')(db.candidates)) {
                return next(new Error('Invalid vote, missing required fields (candidateId, voterId)'));
            }
        }

        return next();
    };
};