export const pushSocketId = (users, userId, socketId) => {
    if (users[userId]) {
        users[userId].push(socketId);
    } else {
        users[userId] = [socketId];
    }
    return users;
};
  
export const emitData = (users, userId, io, event, data) => {
    users[userId].forEach(socketId =>
      io.sockets.connected[socketId].emit(event, data)
    );
};
  
export const removeSocketId = (users, userId, socketId) => {
    users[userId] = users[userId].filter(socketIdOfArr => socketIdOfArr !== socketId);
    if (!users[userId].length) {
      delete users[userId];
    }
    return users;
};
  