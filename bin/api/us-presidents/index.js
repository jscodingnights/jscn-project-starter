'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _votes = require('./votes');

var _votes2 = _interopRequireDefault(_votes);

var _summary = require('./summary');

var _summary2 = _interopRequireDefault(_summary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utils.createJsonServer)(_db2.default)(function (server) {
    server.use('/candidates/:id?', (0, _utils.readOnlyRoute)(['put', 'delete']));
    server.use('/votes/:id?', (0, _utils.readOnlyRoute)(['put', 'delete']));

    server.use('/votes', (0, _votes2.default)(_db2.default));
    server.use('/summary', (0, _summary2.default)(_db2.default));
});