import Group from '../../models/ChatGroup';

import {
  pushSocketId,
  emitData,
  removeSocketId
} from '../../helpers/SocketHelper';

const createGroup = io => {
  let users = {};
  io.on('connection', socket => {
    users = pushSocketId(users, socket.request.user._id, socket.id);

    socket.on('create-group', async group => {
      // save group
      const result = await Group.createNew(group);
      
      // response
      result.members.forEach(memberId => {
        if (users[memberId]) {
          emitData(
            users,
            memberId,
            io,
            'response-group-creation',
            result
          );
        }
      });
    });

    socket.on('disconnect', () => {
      users = removeSocketId(users, socket.request.user._id, socket.id);
    });
  });
};

module.exports = createGroup;
