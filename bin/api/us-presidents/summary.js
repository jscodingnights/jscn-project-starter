'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var latestVoteByCitizen = function latestVoteByCitizen(allVotesByCitizen) {
    return Object.keys(allVotesByCitizen).reduce(function (prog, key) {
        return _extends({}, prog, _defineProperty({}, key, (0, _lodash.last)((0, _lodash.sortBy)(allVotesByCitizen[key], 'createdOn'))));
    }, allVotesByCitizen);
};

var countByCandidateId = function countByCandidateId(userVotes) {
    var votes = (0, _lodash.values)(userVotes);
    return (0, _lodash.countBy)(votes, 'candidateId');
};

var selectMaxCandidate = function selectMaxCandidate(candidateScores) {
    var max = 0;
    return Object.keys(candidateScores).reduce(function (winning, cid) {
        var candidateVotes = candidateScores[cid];
        return candidateVotes > max ? parseInt(cid, 10) : winning;
    });
};

exports.default = function (_ref) {
    var votes = _ref.votes;
    var candidates = _ref.candidates;
    return function (req, res) {
        var allVotesByCitizen = (0, _lodash.groupBy)(votes, 'voterId');
        var countingVotesByCitizen = latestVoteByCitizen(allVotesByCitizen);
        var candidateScores = countByCandidateId(countingVotesByCitizen);
        var winningCandidateId = selectMaxCandidate(candidateScores);
        var winningCandidate = (0, _lodash.find)(candidates, { id: winningCandidateId });
        var summary = {
            candidates: candidates,
            allVotes: votes,
            allVotesByCitizen: allVotesByCitizen,
            countingVotesByCitizen: countingVotesByCitizen,
            candidateScores: candidateScores,
            winningCandidate: winningCandidate
        };
        return res.json(summary);
    };
};