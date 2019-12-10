import {
    pushSocketId,
    emitData,
    removeSocketId
  } from '../../helpers/SocketHelper';
  
  let removeContact = io => {
    let clients = {};
    io.on('connection', socket => {
      clients = pushSocketId(clients, socket.request.user._id, socket.id);
      socket.on('remove-contact', data => {
        let currentUser = {
          id: socket.request.user._id
        };
  
        if (clients[data.contactId]) {
          emitData(
            clients,
            data.contactId,
            io,
            'respond-remove-contact',
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
  
  module.exports = removeContact;