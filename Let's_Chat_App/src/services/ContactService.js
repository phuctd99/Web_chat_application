import ContactModel from '../models/Contact';
import UserModel from '../models/User';
import NotificationModel from '../models/Notification';

const LIMIT_NUMBER =10;
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

let getContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER);
      let users = contacts.map(async (contact) => {
        if(contact.contactId==currentUserId){
          return await UserModel.findUserById(contact.userId);
        }else{
        return await UserModel.findUserById(contact.contactId);
        };
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

let getContactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsSent(currentUserId, LIMIT_NUMBER);
      let users = contacts.map(async (contact) => {getContactsSent
        return await UserModel.findUserById(contact.contactId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

let getContactsReviece = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsReviece(currentUserId, LIMIT_NUMBER);
      let users = contacts.map(async (contact) => {
        return await UserModel.findUserById(contact.userId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

let countAllContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await ContactModel.countAllContacts(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
let countAllContactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactsSent(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
let countAllContactsReviece = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactsReviece(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeReqCon: removeReqCon,
  getContacts: getContacts,
  getContactsSent: getContactsSent,
  getContactsReviece: getContactsReviece,
  countAllContacts: countAllContacts,
  countAllContactsReviece: countAllContactsReviece,
  countAllContactsSent: countAllContactsSent
};