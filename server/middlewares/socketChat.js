function socketChat(io, logger) {
  const messages = [];
  const clientNames = [];

  const CHAT_ROOM = 'CHAT_ROOM';

  io.on('connection', (socket) => {
    socket.on('joinChat', () => {
      socket.join(CHAT_ROOM, () => {
        socket.emit('chat', { chat: messages });
        logger.log('adding socket to chat room', 'chat');
        clientNames.push(socket.nickname);
        io.in(CHAT_ROOM).emit('clients', { clientNames });
      });

      socket.on('disconnect', socketLeftChatRoom.bind(this, socket));
    });

    socket.on('chatMessageAdd', (data) => {
      logger.log(data, 'chat');
      data.time = new Date().getTime(); // eslint-disable-line no-param-reassign
      messages.push(data);
      io.in(CHAT_ROOM).emit('chat', { chat: messages });
    });

    socket.on('leaveChat', socketLeftChatRoom.bind(this, socket));
  });

  function socketLeftChatRoom(socket) {
    logger.log('leaving chatroom', 'chat');
    socket.leave(CHAT_ROOM);
    clientNames.splice(clientNames.indexOf(socket.nickname), 1);
    io.in(CHAT_ROOM).emit('clients', { clientNames });
  }
}

module.exports = socketChat;
