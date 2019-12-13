import mongoose from 'mongoose';

let { Schema, Types } = mongoose;

let MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'user' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'user' },
  groupId: String,
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
        {$and: [{ senderId: Types.ObjectId(senderId) }, { receiverId: Types.ObjectId(receiverId) }]},
        {$and: [{ senderId: Types.ObjectId(receiverId) }, { receiverId: Types.ObjectId(senderId) }]}
      ]
    }).exec();
  },
  getGroupMessages(groupId){
    return this.find({
      groupId: groupId
    })
    .populate('senderId', 'username avatar')
    .exec();
  }
};

module.exports = mongoose.model('message', MessageSchema);
