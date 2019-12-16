import { message } from '../services/index';

const getAllMessages = async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;
  const type = req.query.type;
  if (type == 'person') {
    const messages = await message.getMessageBySenderIdAndReceiverId(senderId, receiverId);
  return res.json({messages: messages});
  }else if (type == 'group') {
    const messages = await message.getGroupMessages(receiverId); // a.k.a groupId
    return res.json({messages: messages});
  }
};

module.exports = {
  getAllMessages: getAllMessages
}
