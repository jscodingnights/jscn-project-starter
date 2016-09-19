import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import usPresidents from './us-presidents';
import chat from './chat';

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

server.listen(process.env.PORT || 3001, () => {
  console.log('JSCN Server is running: 3001');
});

export default app;
