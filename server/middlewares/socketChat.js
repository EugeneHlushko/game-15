function socketChat(io, logger) {
  const messages = [];

  const CHAT_ROOM = 'CHAT_ROOM';

  io.on('connection', (socket) => {
    socket.on('joinChat', () => {
      socket.join(CHAT_ROOM, () => {
        socket.emit('chat', { chat: messages });
        logger.log('adding socket to chat room', 'chat');
      });

      socket.on('disconnect', () => {
        logger.log('leaving chatroom', 'chat');
        socket.leave(CHAT_ROOM);
      });
    });

    socket.on('chatMessageAdd', (data) => {
      logger.log(data, 'chat');
      data.time = new Date().getTime();
      messages.push(data);
      io.in(CHAT_ROOM).emit('chat', { chat: messages });
    });

    socket.on('leaveChat', () => {
      logger.log('leaving chatroom', 'chat');
      socket.leave(CHAT_ROOM);
    });
  });
};

module.exports = socketChat;
