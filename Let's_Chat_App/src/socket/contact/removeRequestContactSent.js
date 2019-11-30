import {
    pushSocketId,
    emitData,
    removeSocketId
  } from '../../helpers/SocketHelper';
  
  let removeRequestContactSent = io => {
    let clients = {};
    io.on('connection', socket => {
      clients = pushSocketId(clients, socket.request.user._id, socket.id);
      socket.on('remove-request-contact-sent', data => {
        let currentUser = {
          id: socket.request.user._id
        };
  
        if (clients[data.contactId]) {
          emitData(
            clients,
            data.contactId,
            io,
            'respond-remove-request-contact-sent',
            currentUser
          );
        }
      });
      socket.on('disconnect', () => {
        clients = removeSocketId(
          clients,
          socket.request.user._id,
          socket.id
        );
      });
    });
  };
  
  module.exports = removeRequestContactSent;