import { groupBy, sortBy, last, values, countBy } from 'lodash';

const sortUserVotes = (allUserVotes) => {
    return Object.keys(allUserVotes).reduce((prog, key) => {
        return {
            ...prog,
            [key]: last(sortBy(allUserVotes[key], 'createdOn'))
        };
    }, allUserVotes);
};

const sumByCandidateId = (userVotes) => {
    const votes = values(userVotes);
    return countBy(votes, 'candidateId');
}

export default ({ votes }) => (req, res, next) => {
    const allUserVotes = groupBy(votes, 'voterId');
    const finalUserVote = sortUserVotes(allUserVotes);
    const candidateTotals = sumByCandidateId(finalUserVote);

    return res.json({
        byVoterId: finalUserVote,
        byCandidateId: candidateTotals
    });
};
