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
    removeRequestContact(userId, contactId) {
      return this.remove({
        $and: [{ userId: userId }, { contactId: contactId }]
      }).exec();
    }
    
};
module.exports = mongoose.model("contact", ContactSchema);