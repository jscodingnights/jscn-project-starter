'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _db = require('../../api/us-presidents/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env node, mocha */


var rootUrl = '/api/us-presidents';

describe('/us-presidents', function () {
    describe('/candidates', function () {
        it('GET /candidates => list of candidates', function (done) {
            (0, _supertest2.default)(_index2.default).get(rootUrl + '/candidates').expect('Content-Type', /json/).expect(200, _db2.default.candidates).end(done);
        });
        it('GET /candidates/id => single candidate', function (done) {
            (0, _supertest2.default)(_index2.default).get(rootUrl + '/candidates/1').expect('Content-Type', /json/).expect(200, _db2.default.candidates[0]).end(done);
        });
        it('POST /candidates => create new candidate', function (done) {
            (0, _supertest2.default)(_index2.default).post(rootUrl + '/candidates').send({ name: 'My Candidate' }).expect(function (res) {
                (0, _expect2.default)(res.body.name).toEqual('My Candidate');
                (0, _expect2.default)(res.body.id).toEqual(3);
            }).end(done);
        });
        it('PUT /candidates/1 => should not update hillary', function (done) {
            (0, _supertest2.default)(_index2.default).put(rootUrl + '/candidates/1').send({ name: 'New Hillary' }).expect(function (res) {
                (0, _expect2.default)(res.status).toEqual(403);
            }).end(done);
        });
        it('DELETE /candidates/1 => should not delete hillary', function (done) {
            (0, _supertest2.default)(_index2.default).delete(rootUrl + '/candidates/1').expect(function (res) {
                (0, _expect2.default)(res.status).toEqual(403);
            }).end(done);
        });
    });

    describe('/votes', function () {
        it('GET /votes => list of votes', function (done) {
            (0, _supertest2.default)(_index2.default).get(rootUrl + '/votes').expect('Content-Type', /json/).expect(200, _db2.default.votes).end(done);
        });
        it('GET /votes/id => single vote', function (done) {
            (0, _supertest2.default)(_index2.default).get(rootUrl + '/votes/1').expect('Content-Type', /json/).expect(200, _db2.default.votes[0]).end(done);
        });
        it('POST /votes => valid vote cast', function (done) {
            (0, _supertest2.default)(_index2.default).post(rootUrl + '/votes').send({ candidateId: 2 }).expect(201).expect(function (res) {
                (0, _expect2.default)(res.body.id).toExist();
                (0, _expect2.default)(res.body.candidateId).toEqual(2);
            }).end(done);
        });
        it('POST /votes => missing candidateId', function (done) {
            (0, _supertest2.default)(_index2.default).post(rootUrl + '/votes').send({}).expect(500, {
                message: 'Invalid vote, missing required fields (candidateId, voterId)',
                success: false
            }).end(done);
        });
        it('POST /votes => missing candidateId', function (done) {
            (0, _supertest2.default)(_index2.default).post(rootUrl + '/votes').send({}).expect(500, {
                message: 'Invalid vote, missing required fields (candidateId, voterId)',
                success: false
            }).end(done);
        });
        it('POST /votes => bad candidateId', function (done) {
            (0, _supertest2.default)(_index2.default).post(rootUrl + '/votes').send({ candidateId: 1000 }).expect(500, {
                message: 'Invalid vote, missing required fields (candidateId, voterId)',
                success: false
            }).end(done);
        });
        it('PUT /votes/1 => should not update votes', function (done) {
            (0, _supertest2.default)(_index2.default).put(rootUrl + '/votes/1').send({ candidateId: 1000 }).expect(function (res) {
                (0, _expect2.default)(res.status).toEqual(403);
            }).end(done);
        });
        it('DELETE /votes/1 => should not delete votes', function (done) {
            (0, _supertest2.default)(_index2.default).delete(rootUrl + '/votes/1').expect(function (res) {
                (0, _expect2.default)(res.status).toEqual(403);
            }).end(done);
        });
    });

    describe('/summary', function () {
        it('GET /summary => list of candidates and their vote counts', function (done) {
            (0, _supertest2.default)(_index2.default).get(rootUrl + '/summary').expect('Content-Type', /json/).expect(200).expect(function (res) {
                (0, _expect2.default)(res.body.candidateScores).toEqual({ '1': 2, '2': 4 });
                (0, _expect2.default)(res.body.winningCandidate.name).toEqual('Donald Trump');
            }).end(done);
        });
    });
});