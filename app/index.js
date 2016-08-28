import express from 'express';
import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import db from './db';
import voteMiddleware from './voteMiddleware';

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const denied = (req, res) => res.send(403, 'This endpoint is read/create (GET)');
const readOnlyRoute = (methods) => {
    const router = express.Router();
    methods.forEach(m => router[m]('/', denied));
    return router;
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(bodyParser.json());
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.use('/candidates/:id?', readOnlyRoute(['put', 'delete']));
server.use('/votes/:id?', readOnlyRoute(['put', 'delete']));
server.use('/votes', voteMiddleware(db));

// Use default router
server.use(router);
server.use((err, req, res, next) => {
    return res.send(500, {
        success: false,
        message: err.message
    });
})
server.listen(3000, () => {
  console.log('JSON Server is running');
});

export default server;
