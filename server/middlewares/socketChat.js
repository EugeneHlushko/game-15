const debug = require('debug')('chat');

function socketChat(io) {
  const messages = [
    {
      time: '18:30:21',
      text: 'This is a cool chat message man!',
      owner: 'John',
    },
  ];

  const CHAT_ROOM = 'CHAT_ROOM';

  io.on('connection', (socket) => {
    socket.on('joinChat', () => {
      socket.join(CHAT_ROOM, () => {
        socket.emit('chat', { chat: messages });
        debug('adding socket to chat room');
      });

      socket.on('disconnect', () => {
        debug('leaving chatroom');
        socket.leave(CHAT_ROOM);
      });
    });

    socket.on('chatMessageAdd', (data) => {
      debug(data);
      messages.push(data);
      io.in(CHAT_ROOM).emit('chat', { chat: messages });
    });

    socket.on('leaveChat', () => {
      debug('leaving chatroom');
      socket.leave(CHAT_ROOM);
    });
  });
};

module.exports = socketChat;
