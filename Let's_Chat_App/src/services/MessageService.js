import MessageModel from '../models/Message';

const saveMessage = async item => {
  await MessageModel.createNew(item);
};

const getMessageBySenderIdAndReceiverId = async (senderId, receiverId) => {
  const messages = await MessageModel.getMessageBySenderIdAndReceiverId(senderId, receiverId);
  return messages;
};

const getGroupMessages = async groupId => {
  const messages = await MessageModel.getGroupMessages(groupId);
  return messages;
}

module.exports = {
  saveMessage: saveMessage,
  getMessageBySenderIdAndReceiverId: getMessageBySenderIdAndReceiverId,
  getGroupMessages: getGroupMessages
};
