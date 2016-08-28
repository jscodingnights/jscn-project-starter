import jsonServer from 'json-server';
import db from './db';
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', function (req, res) {
  res.jsonp(req.query);
});

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3000, function () {
  console.log('JSON Server is running');
});

export default server;
