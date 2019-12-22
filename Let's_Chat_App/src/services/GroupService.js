import ChatGroupModel from '../models/ChatGroup';
import UserModel from '../models/User';
import Contact from './ContactService';

const getAllGroupById = userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const groups = await ChatGroupModel.getGroupByUserId(userId);
      resolve(groups);
    } catch (error) {
      reject(error);
    }
  });
}

const createGroup = group => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.createNew(group);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

const addMember = (groupId, userId, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.addMember(groupId, userId);
      if (role === 'admin'){
      await ChatGroupModel.authorizeGroupManager(groupId, userId);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

const kickMember = (groupId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.kickMember(groupId, userId);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

const getGroupAndMembersByGroupId = groupId =>{
  return new Promise(async (resolve, reject) => {
    try {
      const group = await ChatGroupModel.getGroupById(groupId);
      const membersInfo = await UserModel.getUsersById(group.members);
      resolve({group, membersInfo});
    } catch (error) {
      reject(error);
    }
  });
}

const authorizeGroupManager = (groupId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ChatGroupModel.authorizeGroupManager(groupId, userId);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

const getFriendsNotInGroup = (groupId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const friends = await Contact.getContacts(userId);
      const groupMembers = await ChatGroupModel.getMembers(groupId);
      const result = friends.filter(friend => {
        return !groupMembers.members.includes(friend._id);
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getAllGroupById: getAllGroupById,
  createGroup: createGroup,
  addMember: addMember,
  kickMember: kickMember,
  getGroupAndMembersByGroupId: getGroupAndMembersByGroupId,
  authorizeGroupManager: authorizeGroupManager,
  getFriendsNotInGroup: getFriendsNotInGroup
}
