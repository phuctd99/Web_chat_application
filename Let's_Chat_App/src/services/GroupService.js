import ChatGroupModel from '../models/ChatGroup';

const getAllGroupById = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const groups = await ChatGroupModel.getGroupByUserId(userId);
      resolve(groups);
    } catch (error) {
      reject(error);
    }
  });
}

const createGroup = async group => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.createNew(group);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

const addMember = async (groupId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.addMember(groupId, userId);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

const kickMember = async (groupId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.kickMember(groupId, userId);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getAllGroupById: getAllGroupById,
  createGroup: createGroup,
  addMember: addMember,
  kickMember: kickMember
}
