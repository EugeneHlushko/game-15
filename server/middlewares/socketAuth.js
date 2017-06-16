const debug = require('debug').enable('auth');

const { SOCKET_NAME_SET } = require('../../app/shared/constants');

function socketAuth(io) {
  io.on('connection', (socket) => {
    socket.on(SOCKET_NAME_SET, (name) => {
      console.log(`Setting nickname ${name} for socketid ${socket.id}`);
      socket.set('nickname', name);
    });
  });
};

module.exports = socketAuth;
