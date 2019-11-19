import ContactModel from '../models/Contact';
import UserModel from '../models/User';

let findUsers = (currentUserId, searchKey) => {
  return new Promise(async (resolve, reject) => {
    // console.log(currentUserId);
    let usersContacted = await ContactModel.findAllUserById(currentUserId);
    let userFilter = [];
    userFilter.push(currentUserId);
    usersContacted.forEach(user => {
      userFilter.push(user.contactId);
    });
    // console.log(userFilter);
    let contacts = await UserModel.findUserForAdding(userFilter, searchKey);
    // console.log(contacts);
    resolve(contacts);
  });
};

let addNew = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    const newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };
    let newContact = await ContactModel.createNew(newContactItem);
    resolve(newContact);
  });
};

let removeReqCon = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContact(
      currentUserId,
      contactId
    );
    if (removeReq.n === 0) {
      return reject(false);
    }
    resolve(true);
  });
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeReqCon: removeReqCon
};