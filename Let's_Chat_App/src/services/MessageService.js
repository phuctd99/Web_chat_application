import MessageModel from '../models/Message';

const saveMessage = async item => {
  return new Promise(async (resolve, reject) => {
    try {
      await MessageModel.createNew(item);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const getMessageBySenderIdAndReceiverId = async (senderId, receiverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const messages = await MessageModel.getMessageBySenderIdAndReceiverId(senderId, receiverId);
      resolve(messages);
    } catch (error) {
      reject(error);
    }
  });
};

const getGroupMessages = async groupId => {
  return new Promise(async (resolve, reject) => {
    try {
      const messages = await MessageModel.getGroupMessages(groupId);
      resolve(messages);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  saveMessage: saveMessage,
  getMessageBySenderIdAndReceiverId: getMessageBySenderIdAndReceiverId,
  getGroupMessages: getGroupMessages
};
