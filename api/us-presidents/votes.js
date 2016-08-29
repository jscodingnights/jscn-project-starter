import { find } from 'lodash';

const bodyKeyExists = (req) => (key) => (collection) => {
    const id = req.body[key];
    return find(collection, { id });
};

const setBody = (values) => (req) => {
    req.body = {
        ...req.body,
        ...values,
    };
    return req;
};

export default (db) => (req, res, next) => {
    if (req.method === 'POST') {
        setBody({
            voterId: req.ip,
            createdOn: new Date(),
        })(req);

        if (!bodyKeyExists(req)('candidateId')(db.candidates)) {
            return next(new Error('Invalid vote, missing required fields (candidateId, voterId)'));
        }
    }

    return next();
};
