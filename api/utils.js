import express from 'express';
import jsonServer from 'json-server';

export const denied = (req, res) => res.send(403, 'This endpoint is read/create (GET)');
export const readOnlyRoute = (methods) => {
    const router = express.Router();
    methods.forEach(m => router[m]('/', denied));
    return router;
};
export const createJsonServer = (db) => (custom) => {
    const server = jsonServer.create();
    const router = jsonServer.router(db);
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    custom(server);
    server.use(router);

    return server;
};
