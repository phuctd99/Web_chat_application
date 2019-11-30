import {
    pushSocketId,
    emitData,
    removeSocketId
  } from '../../helpers/SocketHelper';
  
  let addNewContact = io => {
    let clients = {};
    io.on('connection', socket => {
      clients = pushSocketId(clients, socket.request.user._id, socket.id);
      socket.on('add-new-contact', data => {
        let currentUser = {
          id: socket.request.user._id,
          username: socket.request.user.username,
          avatar: socket.request.user.avatar,
          address:(socket.request.user.address !==null) ? socket.request.user.address : ""
        };
  
        if (clients[data.contactId]) {
          emitData(
            clients,
            data.contactId,
            io,
            'respond-add-new-contact-sent',
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
  
  module.exports = addNewContact;