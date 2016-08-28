/* eslint-env node, mocha */
import expect from 'expect';
import request from 'supertest';
import app from '../app';

describe('/candidates', () => {
    it('GET /candidates => list of candidates', (done) => {
        request(app)
            .get('/candidates')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    id: 1,
                    name: 'Hillary Clinton',
                    photoUrl: 'http://www.newsbiscuit.com/wp-content/uploads/2015/10/hillary-clinton-womenjpeg-045d7.jpg',
                },
                {
                    id: 2,
                    name: 'Donald Trump',
                    photoUrl: 'http://images.huffingtonpost.com/2016-07-15-1468607338-43291-DonaldTrumpangry.jpg',
                }
            ])
            .end(done);
    });
    it('POST /candidates => create new candidate', (done) => {
        request(app)
            .post('/candidates')
            .send({ name: 'My Candidate' })
            .expect(res => {
                expect(res.body.name).toEqual('My Candidate');
                expect(res.body.id).toEqual(3);
            })
            .end(done);
    });
    it('PUT /candidates/1 => should not update hillary', (done) => {
        request(app)
            .put('/candidates/1')
            .send({ name: 'New Hillary' })
            .expect(res => {
                expect(res.status).toEqual(403);
            })
            .end(done);
    });
    it('DELETE /candidates/1 => should not delete hillary', (done) => {
        request(app)
            .delete('/candidates/1')
            .expect(res => {
                expect(res.status).toEqual(403);
            })
            .end(done);
    });
});
