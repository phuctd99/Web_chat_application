import ContactModel from '../models/Contact';
import UserModel from '../models/User';
import NotificationModel from '../models/Notification';
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
    let contactExist = await ContactModel.checkExists(currentUserId, contactId);
    if (contactExist) {
      return reject(false);
    }
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };

    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ADD_CONTACT,
    };
    await NotificationModel.model.createNew(notificationItem);
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
    // remove notification
    await NotificationModel.model.
        removeRequestContactNotification(currentUserId, 
          contactId, NotificationModel.types.ADD_CONTACT);
    resolve(true);
  });
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeReqCon: removeReqCon
};