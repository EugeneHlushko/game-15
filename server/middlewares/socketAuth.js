const { SOCKET_NAME_SET } = require('../../app/shared/constants');

function socketAuth(io, logger) {
  io.on('connection', (socket) => {
    socket.on(SOCKET_NAME_SET, (name) => {
      logger.log(`Setting nickname ${name} for socketid ${socket.id}`);
      socket.nickname = name; // eslint-disable-line no-param-reassign
    });
  });
}

module.exports = socketAuth;
