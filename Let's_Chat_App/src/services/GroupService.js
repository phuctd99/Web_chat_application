import ChatGroupModel from '../models/ChatGroup';

const getAllGroupById = async userId => {
  const groups = await ChatGroupModel.getGroupByUserId(userId);
  return groups;
}

module.exports = {
  getAllGroupById: getAllGroupById
}
