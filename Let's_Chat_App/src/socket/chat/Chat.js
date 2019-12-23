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
      await Message.saveMessage(data);

      // save latset message
      let latestMessageContent;
      if (data.file){
        latestMessageContent = 'gửi một ảnh';
      }else{
        latestMessageContent = data.text;
      }
      const latestMessage = {
        sender: data.senderId,
        content: latestMessageContent,
        createdAt: data.createdAt
      }
      await Contact.updateTheLatestMessage(data.senderId, data.receiverId, latestMessage);

      // send message to sender
      emitData(
        users,
        data.senderId,
        io,
        'update-sender-message-box',
        data
      );

      // send message to receiver if online
      if (users[data.receiverId]) {
        emitData(
          users,
          data.receiverId,
          io,
          'receive-message',
          data
        );
      }
    });
    socket.on('send-group-message', async data => {
      const memberIds = await Group.getMembers(data.groupId);
      if (memberIds.members.includes(data.senderId._id)){
        // save message on db
        await Message.saveMessage(data);

        // save latset contact
        let latestMessageContent;
        if (data.file){
          latestMessageContent = 'gửi một ảnh';
        }else{
          latestMessageContent = data.messageContent;
        }
        const latestMessage = {
          sender: data.senderId._id,
          content: latestMessageContent,
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
        });
      }
    });
    socket.on('disconnect', () => {
      users = removeSocketId(users, socket.request.user._id, socket.id);
    });
  });
};

module.exports = chat;
