const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// bodyParser middleware
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// socket.io stuff
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('messageFromClient', (message) => {
    console.log('Incoming message from client: ', message);

    io.emit('messageFromServer', message);
    console.log('Message sent back to client: ', message);
  });

  // Disconnect //
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
