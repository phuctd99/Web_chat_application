import Message from '../../services/MessageService';
import Contact from '../../models/Contact';
import {
  pushSocketId,
  emitData,
  removeSocketId
} from '../../helpers/SocketHelper';

const chat = (users, io) => {
  io.on('connection', socket => {
    users = pushSocketId(users, socket.request.user._id, socket.id);
    socket.on('send-message', data => {
      // save message on db
      const message = {
        senderId: socket.request.user._id,
        receiverId: data.receiverId,
        text: data.messageContent
      };
      Message.saveMessage(message);

      // save latset contact
      const latestMessage = {
        sender: socket.request.user._id,
        content: data.messageContent,
        createdAt: new Date().getTime()
      }
      Contact.updateTheLatestMessage(socket.request.user._id, data.receiverId, latestMessage);

      // send message to sender
      emitData(
        users,
        data.senderId,
        io,
        'update-sender-message-box',
        data.messageContent
      );

      // send message to receiver if online
      if (users[data.receiverId]) {
        emitData(
          users,
          data.receiverId,
          io,
          'receive-message',
          message
        );
      }
    });
    socket.on('disconnect', () => {
      users = removeSocketId(users, socket.request.user._id, socket.id);
    });
  });
};

module.exports = chat;
