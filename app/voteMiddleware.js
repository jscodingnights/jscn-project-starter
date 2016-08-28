import { find } from 'lodash';
import { deleteVotesByIp, getCandidateById } from './dbUtil';

const ensureBody = (req) => req.body = req.body || {};
const ensureVoterId = (req) => req.body.voterId = req.ip;
const ensureCreatedOn = (req) => req.body.createdOn = new Date();
const validateCandidate = (db) => (req) => {
    const { candidateId } = req.body;
    const candidateExists = !!getCandidateById(db, candidateId);

    return candidateId && candidateExists;
};

export default (db) => (req, res, next) => {
    if (req.method === 'POST') {
        ensureBody(req);
        ensureVoterId(req);
        ensureCreatedOn(req);

        if (!validateCandidate(db)(req)) {
            return next(new Error('Invalid vote, missing required fields (candidateId, voterId)'));
        }
    }
    next();
};
