import Message from '../../services/MessageService';
import Contact from '../../models/Contact';
import Group from '../../models/ChatGroup';
import {
  pushSocketId,
  emitData,
  removeSocketId
} from '../../helpers/SocketHelper';

const chat = (io) => {
  let users = {};
  io.on('connection', socket => {
    users = pushSocketId(users, socket.request.user._id, socket.id);
    socket.on('send-message',async data => {
      // save message on db
      const message = {
        createdAt: data.createdAt,
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.messageContent
      };
      await Message.saveMessage(message);

      // save latset contact
      const latestMessage = {
        sender: data.senderId,
        content: data.messageContent,
        createdAt: data.createdAt
      }
      await Contact.updateTheLatestMessage(data.senderId, data.receiverId, latestMessage);

      // send message to sender
      emitData(
        users,
        data.senderId,
        io,
        'update-sender-message-box',
        message
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
    socket.on('send-group-message', async data => {
      // save message on db
      const message = {
        createdAt: data.createdAt,
        senderId: data.senderId._id,
        groupId: data.groupId,
        text: data.text
      };
      await Message.saveMessage(message);

      // save latset contact
      const latestMessage = {
        sender: data.senderId._id,
        content: data.text,
        createdAt: data.createdAt
      }
      await Group.updateTheLatestMessage(data.groupId, latestMessage);

      // send message to sender
      emitData(
        users,
        data.senderId._id,
        io,
        'update-sender-message-box',
        data
      );

      //send message to members
      const memberIds = await Group.getMembers(data.groupId);
      memberIds.members.forEach(memberId => {
        if (memberId !== data.senderId._id){
          if (users[memberId]) {
            emitData(
              users,
              memberId,
              io,
              'receive-group-message',
              data
            );
          }
        }
      })

    });

    socket.on('disconnect', () => {
      users = removeSocketId(users, socket.request.user._id, socket.id);
    });
  });
};

module.exports = chat;
