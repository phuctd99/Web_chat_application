import MessageModel from '../models/Message';

const saveMessage = item => {
  MessageModel.createNew(item);
};

const getMessageByUserId = id => {};

module.exports = {
  saveMessage: saveMessage
};
