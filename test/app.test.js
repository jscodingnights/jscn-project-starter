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
    it('GET /candidates/id => single candidate', (done) => {
        request(app)
            .get('/candidates/1')
            .expect('Content-Type', /json/)
            .expect(200, {
                id: 1,
                name: 'Hillary Clinton',
                photoUrl: 'http://www.newsbiscuit.com/wp-content/uploads/2015/10/hillary-clinton-womenjpeg-045d7.jpg',
            })
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

describe('/votes', () => {
    it('GET /votes => list of votes', (done) => {
        request(app)
            .get('/votes')
            .expect('Content-Type', /json/)
            .expect(200, [
                {
                    "id": 1,
                    "candidateId": 1,
                    "voterId": "::ffff:127.0.0.1",
                    "createdOn": "2016-08-28T20:05:43.150Z"
                }
            ])
            .end(done);
    });
    it('GET /votes/id => single vote', (done) => {
        request(app)
            .get('/votes/1')
            .expect('Content-Type', /json/)
            .expect(200, {
                "id": 1,
                "candidateId": 1,
                "voterId": "::ffff:127.0.0.1",
                "createdOn": "2016-08-28T20:05:43.150Z"
            })
            .end(done);
    });
    it('POST /votes => valid vote cast', (done) => {
        request(app)
            .post('/votes')
            .send({ candidateId: 2 })
            .expect(res => {
                expect(res.body.id).toEqual(1);
                expect(res.body.candidateId).toEqual(2);
            })
            .end(done);
    });
    it('POST /votes => another valid vote replaces the previous', (done) => {
        request(app)
            .get('/votes')
            .expect(res => {
                const me = res.body[0];
                expect(me.id).toEqual(1);
                expect(me.candidateId).toEqual(1);
            }).end(() => {
                request(app)
                    .post('/votes')
                    .send({ candidateId: 2 })
                    .end(() => {
                        request(app)
                            .get('/votes')
                                .expect(res => {
                                    const me = res.body[0];
                                    console.log(JSON.stringify(res.body, null, 2));
                                    expect(res.body.length).toEqual(1);
                                    expect(me.id).toEqual(1);
                                    expect(me.candidateId).toEqual(2);
                                })
                                .end(done);
                    });
            })

    });
    it('POST /votes => missing candidateId', (done) => {
        request(app)
            .post('/votes')
            .send({ })
            .expect(500, {
                message: 'Invalid vote, missing required fields (candidateId, voterId)',
                success: false
            })
            .end(done);
    });
    it('POST /votes => missing candidateId', (done) => {
        request(app)
            .post('/votes')
            .send({ })
            .expect(500, {
                message: 'Invalid vote, missing required fields (candidateId, voterId)',
                success: false
            })
            .end(done);
    });
    it('POST /votes => bad candidateId', (done) => {
        request(app)
            .post('/votes')
            .send({ candidateId: 1000 })
            .expect(500, {
                message: 'Invalid vote, missing required fields (candidateId, voterId)',
                success: false
            })
            .end(done);
    });
    it('PUT /votes/1 => should not update votes', (done) => {
        request(app)
            .put('/votes/1')
            .send({ candidateId: 1000 })
            .expect(res => {
                expect(res.status).toEqual(403);
            })
            .end(done);
    });
});


