import { find } from 'lodash';

export const deleteVotesByIp = (db, ip) => {
    db.votes = db.votes.filter(({ voterId }) => {
        return voterId !== ip
    });
};

export const getCandidateById = ({ candidates }, id) =>
    find(candidates, { id });
