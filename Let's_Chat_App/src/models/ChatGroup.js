import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
	name: String,
	userAmount: {type: Number, min: 3, max: 20},
	messageAmount: {type: Number, default: 0},
	userId: String,
	members: [
			{type: String}
	],
	latestMessage:{
			sender: { type: Schema.Types.ObjectId, ref: 'user' },
			content: String,
			createdAt: Number
	},
	createdAt: {type: Number, default: Date.now},
	updatedAt: {type: Number, default: null},
	deletedAt: {type: Number, default: null}
});

ChatGroupSchema.statics = {
	createNew(group){
		return this.create(group);
	},
	addMember(groupId, userId){
		return this.update(
			{ _id: groupId }, 
			{ $push: { members: userId } }
		).exec();
	},
	kickMember(groupId, userId){
		return this.update(
			{ _id: groupId },
			{ 
				$pull: { members: userId}
			}
		).exec();
	},
	getGroupByUserId(userId){
		return this.find({
				members: {
						$elemMatch: { $eq: userId }
				}
		})
		.populate('latestMessage.sender', 'username avatar')
		.sort({'latestMessage.createdAt': -1})
		.exec();
	},
	updateTheLatestMessage(groupId, message){
		return this.findOneAndUpdate(
			{
				_id: groupId
			},
			{ $set: { latestMessage: message } },
			{ upsert: true }
		).exec();
	},
	getMembers(groupId){
		return this.findOne(
			{_id: groupId},
			{
				_id: 0,
				members: 1
			}
		).exec();
	}
};

module.exports = mongoose.model("chat-group", ChatGroupSchema);