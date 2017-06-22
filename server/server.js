const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log( `User ${socket.id} connected`);

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required!');
    }

    var room = params.room.toLowerCase();

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, room);

    io.to(room).emit('updateUserList', users.getUsersList(room));

    socket.emit('newMessage', generateMessage('Admin', `Welcome to "${params.room}"`));

    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('Message created', message);
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    
    callback();

  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} was disconnected`);
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is running on port ${port}`));