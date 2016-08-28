import express from 'express';
import jsonServer from 'json-server';
import db from './db';
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const denied = (req, res) => res.send(403, 'This endpoint is read/create (GET)');
const readOnlyRoute = () => {
    const router = express.Router();
    router.put('/', denied);
    router.delete('/', denied);
    return router;
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.use('/candidates/:id?', readOnlyRoute());

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

export default server;
