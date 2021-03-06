import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import usPresidents from './api/us-presidents';
import chat from './api/chat';

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use('/api/us-presidents', usPresidents);
app.use('/api/chat', chat(io));

// Use default router
app.use((err, req, res, next) => {
    return res.send(500, {
        success: false,
        message: err.message,
    });
});

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('JSCN Server is running: 3000');
});

export default app;
