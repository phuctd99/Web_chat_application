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

let removeRequestContactSent  = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContactSent(
      currentUserId,
      contactId
    );
    if (removeReq.n === 0) {
      return reject(false);
    }
    // remove notification
    await NotificationModel.model.
        removeRequestContactSentNotification(currentUserId, 
          contactId, NotificationModel.types.ADD_CONTACT);
    resolve(true);
  });
};
let removeRequestContactReceive  = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContactReceive(
      currentUserId,
      contactId
    );
    if (removeReq.n === 0) {
      return reject(false);
    }
    await NotificationModel.model.
        removeRequestContactReceiveNotification(currentUserId, 
          contactId, NotificationModel.types.ADD_CONTACT);
    resolve(true);
  });
};
let acceptRequestContactReceive  = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let acceptReq = await ContactModel.acceptRequestContactReceive(
      currentUserId,
      contactId
    );
    if (acceptReq.nModified === 0) {
      return reject(false);
    }
    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ACCEPT_CONTACT,
    };
    await NotificationModel.model.createNew(notificationItem);
    resolve(true);
  });
};

let getContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER);
      let users = contacts.map(async (contact) => {
        if(contact.contactId==currentUserId){
          return await UserModel.getNormalUserById(contact.userId);
        }else{
        return await UserModel.getNormalUserById(contact.contactId);
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
        return await UserModel.getNormalUserById(contact.contactId);
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
        return await UserModel.getNormalUserById(contact.userId);
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

let readMoreContacts =(currentUserId,skipNumberContacts)=>{
  return new Promise(async (resolve, reject) => {
    try {
        let newContacts = await ContactModel.readMoreContacts(currentUserId, skipNumberContacts,LIMIT_NUMBER);
        
        let users = newContacts.map(async (contact) => {
          if(contact.contactId==currentUserId){
            return await UserModel.getNormalUserById(contact.userId);
          }else{
          return await UserModel.getNormalUserById(contact.contactId);
          };
        });
        resolve(await Promise.all(users));
        
    } catch (error) {
        reject(error);
    }
});
};
let readMoreContactsSent =(currentUserId,skipNumberContacts)=>{
  return new Promise(async (resolve, reject) => {
    try {
        let newContacts = await ContactModel.readMoreContactsSent(currentUserId, skipNumberContacts,LIMIT_NUMBER);
        
        let users = newContacts.map(async (contact) => {
          return await UserModel.getNormalUserById(contact.contactId);
        });
        resolve(await Promise.all(users));
        
    } catch (error) {
        reject(error);
    }
});
};
let readMoreContactsReviece =(currentUserId,skipNumberContacts)=>{
  return new Promise(async (resolve, reject) => {
    try {
        let newContacts = await ContactModel.readMoreContactsReviece(currentUserId, skipNumberContacts,LIMIT_NUMBER);
        
        let users = newContacts.map(async (contact) => {
          return await UserModel.getNormalUserById(contact.userId);
        });
        resolve(await Promise.all(users));
        
    } catch (error) {
        reject(error);
    }
});
};

let getAllContacts = currentUserId => {
  return new Promise(async (resolve, reject) => {
    let contactedUsers = await ContactModel.findAllUserById(currentUserId);
    let contactedUserIds = [];
    contactedUsers.forEach(contact => {
      if (contact.status) {
        if (contact.contactId != currentUserId){
          contactedUserIds.push(contact.contactId);
        }else{
          contactedUserIds.push(contact.userId);
        }
      }
    });
    const users = contactedUserIds.map(async (userId, index) => {
      const user = await UserModel.findContactedUserById(userId);
      const result = {
        user: user,
        latestMessage: contactedUsers[index].latestMessage
      };
      return result;
    });
    Promise.all(users).then(users => {resolve(users);});
  });
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeRequestContactSent: removeRequestContactSent,
  removeRequestContactReceive: removeRequestContactReceive,
  acceptRequestContactReceive: acceptRequestContactReceive,
  getContacts: getContacts,
  getContactsSent: getContactsSent,
  getContactsReviece: getContactsReviece,
  countAllContacts: countAllContacts,
  countAllContactsReviece: countAllContactsReviece,
  countAllContactsSent: countAllContactsSent,
  readMoreContacts:readMoreContacts,
  readMoreContactsSent:readMoreContactsSent,
  readMoreContactsReviece:readMoreContactsReviece,
  getAllContacts: getAllContacts
};