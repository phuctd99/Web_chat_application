import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});
ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllUserById(id) {
      return this.find({
        userId: id
      }).exec();
    },
    removeRequestContactSent(userId, contactId) {
      return this.remove({
        $and: [{ userId: userId }, { contactId: contactId }]
      }).exec();
    },
    checkExists(userId, contactId) {
      return this.findOne({
        $or: [
          {$and: [
            {"userId": userId},
            {"contactId": contactId}
          ]},
          {$and: [
            {"userId": contactId},
            {"contactId": userId}
          ]}
        ]
      }).exec();
    },
    getContacts(userId, limit) {
      return this.find({
        $and: [
          {"userId": userId},
          {"status": true}

        ]
      }).sort({"createdAt": -1}).limit(limit).exec();
    },
    getContactsSent(userId, limit) {
      return this.find({
        $and: [
          {$or: [
            {"userId":userId},
            {"contactId":userId}
          ]
          },
          {"status": false}

        ]
      }).sort({"createdAt": -1}).limit(limit).exec();
    },
    getContactsReviece(userId, limit) {
      return this.find({
        $and: [
          {"contactId": userId},
          {"status": false}

        ]
      }).sort({"createdAt": -1}).limit(limit).exec();
    },
    countAllContacts(userId) {
      return this.count({
        $and: [
          {"userId": userId},
          {"status": true}

        ]
      }).exec();
    },
    countAllContactsSent(userId) {
      return this.count({
        $and: [
          {$or: [
            {"userId":userId},
            {"contactId":userId}
          ]
          },
          {"status": false}

        ]
      }).exec();
    },
    countAllContactsReviece(userId) {
      return this.count({
        $and: [
          {"contactId": userId},
          {"status": false}

        ]
      }).exec();
    },
    readMoreContacts(userId,skip,limit){
      return this.find({
        $and: [
          {"userId": userId},
          {"status": true}

        ]
      }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
    },
    readMoreContactsSent(userId,skip,limit){
      return this.find({
        $and: [
          {"userId": userId},
          {"status": true}

        ]
      }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
    },
    readMoreContactsReviece(userId,skip,limit){
      return this.find({
        $and: [
          {"userId": userId},
          {"status": true}

        ]
      }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
    }
    
};
module.exports = mongoose.model("contact", ContactSchema);