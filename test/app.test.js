/* eslint-env node, mocha */
import expect from 'expect';
import request from 'supertest';
import app from '../app';

const arrayFixedIds = (res) => {
    res.body = res.body.map((i, id) => ({ ...i, id}));
}

describe('/candidates', () => {
    it('GET / => list of candidates', (done) => {
        request(app)
            .get('/candidates')
            .expect('Content-Type', /json/)
            .expect(arrayFixedIds)
            .expect(200, [
                {
                    id: 0,
                    name: 'Hillary Clinton',
                    photoUrl: 'http://www.newsbiscuit.com/wp-content/uploads/2015/10/hillary-clinton-womenjpeg-045d7.jpg',
                },
                {
                    id: 1,
                    name: 'Donald Trump',
                    photoUrl: 'http://images.huffingtonpost.com/2016-07-15-1468607338-43291-DonaldTrumpangry.jpg',
                }
            ])
            .end(done);
    });

});
