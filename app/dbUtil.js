import { find } from 'lodash';

export const getCandidateById = ({ candidates }, id) =>
    find(candidates, { id });
