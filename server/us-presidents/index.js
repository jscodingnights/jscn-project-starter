import express from 'express';
import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import db from './db';
import voteMiddleware from './voteMiddleware';
import summaryMiddleware from './summaryMiddleware';

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const denied = (req, res) => res.send(403, 'This endpoint is read/create (GET)');
const readOnlyRoute = (methods) => {
    const router = express.Router();
    methods.forEach(m => router[m]('/', denied));
    return router;
};

server.use(bodyParser.json());
server.use(middlewares);
server.use('/candidates/:id?', readOnlyRoute(['put', 'delete']));
server.use('/votes/:id?', readOnlyRoute(['put', 'delete']));
server.use('/votes', voteMiddleware(db));
server.use('/summary', summaryMiddleware(db));

// Use default router
server.use(router);

export default server;
