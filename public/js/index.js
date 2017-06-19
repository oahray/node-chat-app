var socket = io();

socket.emit('createMessage', {
  from: 'Ray',
  text: "Wassup?"
});

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  console.log('New message received', newMessage);
});
