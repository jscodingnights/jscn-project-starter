import express from 'express';
import bodyParser from 'body-parser';
import usPresidents from './us-presidents';

const server = express();

server.use(bodyParser.json());
server.use('/api/us-presidents', usPresidents);

// Use default router
server.use((err, req, res, next) => {
    return res.send(500, {
        success: false,
        message: err.message,
    });
});

server.listen(3000, () => {
  console.log('JSON Server is running: 3000');
});

export default server;
