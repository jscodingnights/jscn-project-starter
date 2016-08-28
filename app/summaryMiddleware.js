import { groupBy, sortBy, last, values, countBy, find } from 'lodash';

const latestVoteByCitizen = (allVotesByCitizen) => {
    return Object.keys(allVotesByCitizen).reduce((prog, key) => {
        return {
            ...prog,
            [key]: last(sortBy(allVotesByCitizen[key], 'createdOn'))
        };
    }, allVotesByCitizen);
};

const countByCandidateId = (userVotes) => {
    const votes = values(userVotes);
    return countBy(votes, 'candidateId');
};

const selectMaxCandidate = (candidateScores) => {
    const max = 0;
    return Object.keys(candidateScores).reduce((winning, cid) => {
        const candidateVotes = candidateScores[cid];
        return candidateVotes > max ? parseInt(cid, 10) : winning;
    });
}

export default ({ votes, candidates }) => (req, res, next) => {
    const allVotesByCitizen = groupBy(votes, 'voterId');
    const countingVotesByCitizen = latestVoteByCitizen(allVotesByCitizen);
    const candidateScores = countByCandidateId(countingVotesByCitizen);
    const winningCandidateId = selectMaxCandidate(candidateScores);
    const winningCandidate = find(candidates, { id: winningCandidateId });
    const summary = {
        candidates,
        allVotes: votes,
        allVotesByCitizen,
        countingVotesByCitizen,
        candidateScores,
        winningCandidate
    };
    return res.json(summary);
};
