import { contact, group } from '../services/index';
import helper from '../helpers/ArrayHelper';

let findUsers = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let searchKey = req.params.keyword;
    let users = await contact.findUsers(currentUserId, searchKey);
    // console.log(users);
    return res.render('main/contact/search/search', { users });
  } catch (error) {
        return res.status(500).send(error);
  }
};

let addNew = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let newContact = await contact.addNew(currentUserId, contactId);
    return res.status(200).send({success: !!newContact});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeContact = async (req,res) =>{
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeContact = await contact.removeContact(currentUserId, contactId);
    return res.status(200).send({success: !!removeContact});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeRequestContactSent = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeCon = await contact.removeRequestContactSent(currentUserId, contactId);
    return res.status(200).send({success: !!removeCon});
  } catch (error) {
    return res.status(500).send(error);
  }
};
let removeRequestContactReceive = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
    let removeCon = await contact.removeRequestContactReceive(currentUserId, contactId);
    return res.status(200).send({success: !!removeCon});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
let acceptRequestContactReceive = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
    let acceptRequest = await contact.acceptRequestContactReceive(currentUserId, contactId);
    return res.status(200).send({success: !!acceptRequest});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

let readMoreContacts = async (req,res) =>{
  try {
    //get skipNumber
    let skipNumberContacts = +(req.query.skipNumber);
    //get more item
    let newContactUsers = await contact.readMoreContacts(req.user._id, skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
      return res.status(500).send(error);
  }
};
let readMoreContactsSent = async (req,res) =>{
  try {
    //get skipNumber
    let skipNumberContacts = +(req.query.skipNumber);
    //get more item
    let newContactUsers = await contact.readMoreContactsSent(req.user._id, skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
      return res.status(500).send(error);
  }
};
let readMoreContactsReviece = async (req,res) =>{
  try {
    //get skipNumber
    let skipNumberContacts = +(req.query.skipNumber);
    //get more item
    let newContactUsers = await contact.readMoreContactsReviece(req.user._id, skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
      return res.status(500).send(error);
  }
};

const getAllContacts = async (req, res) => {
  const userId = req.user._id;
  let contactedUsers = await contact.getAllContacts(userId);
  let groups = await group.getAllGroupById(userId);
  let usersAndGroups = helper.mergeContactsAndGroups(contactedUsers, groups);
  return res.json({usersAndGroups: usersAndGroups});
};

module.exports = {
  findUsers: findUsers,
  addNew: addNew,
  removeContact:removeContact,
  removeRequestContactSent: removeRequestContactSent,
  acceptRequestContactReceive: acceptRequestContactReceive,
  readMoreContacts:readMoreContacts,
  readMoreContactsSent:readMoreContactsSent,
  readMoreContactsReviece:readMoreContactsReviece,
  removeRequestContactReceive: removeRequestContactReceive,
  getAllContacts: getAllContacts
};