module.exports = (io) => {
  const users = [];

  // on connection
  io.on('connection', (socket) => {
    // incoming username from client
    socket.on('usernameFromClient', (username) => {
      // set username on user's socket
      socket.username = username;
      // add username to list of usernames
      users.push(username);
      // send array of users back to all clients
      io.emit('usersFromServer', users);
    });

    // incoming message from client
    socket.on('messageFromClient', (messageObj) => {
      // broadcast message to all clients
      io.emit('messageFromServer', messageObj);
    });

    // on disconnect //
    socket.on('disconnect', () => {
      if (socket.username) {
        // remove username from users array
        users.splice(users.indexOf(socket.username), 1);
        // broadcast updated users array to all clients
        io.emit('usersFromServer', users);
      }
    });
  });
};
