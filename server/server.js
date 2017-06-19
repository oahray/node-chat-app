const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: "Aite",
    message: 'Hey you',
    createdAt: 6458 
  });

  socket.on('createMessage', (message) => {
    console.log('Message created', message);
    socket.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is running on port ${port}`));