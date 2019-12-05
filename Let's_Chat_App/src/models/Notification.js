import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    type: String,
    isRead: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now}
});
NotificationSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    removeRequestContactSentNotification(senderId, receiverId, type) {
        return this.remove({
            $and: [
                {"senderId": senderId},
                {"receiverId": receiverId},
                {"type": type}
            ]
        }).exec();
    },
    removeRequestContactReceiveNotification(senderId, receiverId, type) {
        return this.remove({
            $and: [
                {"senderId": receiverId},
                {"receiverId": senderId},
                {"type": type}
            ]
        }).exec();
    },
    getByUserIdAndLimit(userId, limit) {
        return this.find({
            "receiverId": userId
        }).sort({"createdAt":1}).limit(limit).exec();
    },
    countNotifUnRead(userId){
        return this.count({
            $and:[
                {"receiverId":userId},
                {"isRead":false}
            ]
        }).exec();
    },
    readMore(userId,skip,limit){
        return this.find({
            "receiverId": userId
        }).sort({"createdAt":1}).skip(skip).limit(limit).exec();
        //skip bo qua cac ban ghi da lay
    },
    markReaded(userId, targetUsers) {
        return this.updateMany({
            $and: [
                {"receiverId": userId},
                {"senderId": {$in: targetUsers}}
            ]
        }, {"isRead": true}).exec();
    }
}

const NOTIFICATION_TYPES = {
    ADD_CONTACT: "add_contact",
    ACCEPT_CONTACT: "accpect_contact"
};
const NOTIFICATION_CONTENTS = {
    getContent: (notificationType, isRead, userId, username, userAvatar) => {
        if (notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
            if (!isRead) {
                return `<div class="noti-readed-false" data-uid="${userId}">
                <img
                class="avatar-small"
                src="/images/users/${userAvatar}"
                alt=""
                />
                <strong>${username}</strong> đã gửi cho bạn một lời mời kết
                bạn! </div>`;
            }
            return `<div data-uid="${userId}">
                <img
                class="avatar-small"
                src="/images/users/${userAvatar}"
                alt=""
                />
                <strong>${username}</strong> đã gửi cho bạn một lời mời kết
                bạn! </div>`;
        }
        if (notificationType === NOTIFICATION_TYPES.ACCEPT_CONTACT) {
            if (!isRead) {
                return `<div class="noti-readed-false" data-uid="${userId}">
                <img
                class="avatar-small"
                src="/images/users/${userAvatar}"
                alt=""
                />
                <strong>${username}</strong> đã đồng ý lời mời kết
                bạn! </div>`;
            }
            return `<div data-uid="${userId}">
                <img
                class="avatar-small"
                src="/images/users/${userAvatar}"
                alt=""
                />
                <strong>${username}</strong> đã đồng ý lời mời kết
                bạn! </div>`;
        }
        return "Bị lỗi";
    }
};
module.exports = {
    model: mongoose.model("notification", NotificationSchema),
    types: NOTIFICATION_TYPES,
    contents: NOTIFICATION_CONTENTS,
    
};