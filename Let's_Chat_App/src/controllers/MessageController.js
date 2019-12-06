import { message } from '../services/index';

const getAllMessages = async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;
  const messages = await message.getMessageBySenderIdAndReceiverId(senderId, receiverId);
  return res.json({messages: messages});
};

module.exports = {
  getAllMessages: getAllMessages
}
