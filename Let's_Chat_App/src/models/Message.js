import mongoose from 'mongoose';

let { Schema } = mongoose;

let MessageSchema = new Schema({
  senderId: String,
  receiverId: String,
  text: String,
  file: { data: Buffer, contentType: String, fileName: String },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

MessageSchema.statics = {
  createNew(message) {
    return this.create(message);
  },
  getMessageBySenderIdAndReceiverId(senderId, receiverId) {
    return this.find({
      $or: [
        {$and: [{ senderId: senderId }, { receiverId: receiverId }]},
        {$and: [{ senderId: receiverId }, { receiverId: senderId }]}
      ]
    }).exec();
  }
};

module.exports = mongoose.model('message', MessageSchema);
