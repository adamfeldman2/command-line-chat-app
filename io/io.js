module.exports = (io) => {
  const connections = [];
  const users = [];

  io.on('connection', (socket) => {
    connections.push(socket);
    console.log('connections: ', connections.length);

    socket.on('usernameFromClient', (username) => {
      socket.username = username;
      users.push(username);
      console.log('Users: ', users);
    });

    socket.on('messageFromClient', (messageObj) => {
      io.emit('messageFromServer', messageObj);
    });

    // Disconnect //
    socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
      console.log('connections: ', connections.length);

      users.splice(users.indexOf(socket.username), 1);
      console.log('Users: ', users);
    });
  });
};
