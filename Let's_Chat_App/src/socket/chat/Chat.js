import {
    pushSocketId,
    emitData,
    removeSocketId
  } from '../../helpers/socketHelper';

const chat = (users, io) => {
    io.on('connection', function(socket) {
        users = pushSocketId(users, socket.request.user._id, socket.id);
        // console.log(users);
        socket.on('send-message', function(data) {
           console.log(data);
           emitData(users, data.senderId, io, 'update-sender-message-box', data.messageContent);
           emitData(users, data.receiverId, io, 'receive-message', data.messageContent);
        });
        socket.on('disconnect', () => {
            users = removeSocketId(
              users,
              socket.request.user._id,
              socket.id
            );
        });
    });
}

module.exports = chat;
