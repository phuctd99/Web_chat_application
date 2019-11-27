import NotificationModel from '../models/Notification';
import UserModel from '../models/User';

const LIMIT_NUMBER =10;
let getNotifications = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.model
                .getByUserIdAndLimit(currentUserId, LIMIT_NUMBER);
            let getNotifiContent = notifications.map(async (notification) => {
                let sender = await UserModel.findUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type,
                     notification.isRead, sender._id, sender.username, sender.avatar);
            });
            resolve(await Promise.all(getNotifiContent));
        } catch (error) {
            reject(error);
        }
    });
};

let countNotifUnRead = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notificationUnread = await NotificationModel.model.countNotifUnRead(currentUserId);
            resolve(notificationUnread);
        } catch (error) {
            reject(error);
        }
    });
};
//read more notification
let readMore = (currentUserId, skipNumberNotification) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newNotifications = await NotificationModel.model.readMore(currentUserId, skipNumberNotification,LIMIT_NUMBER);
            
            let getNotifiContent = newNotifications.map(async (notification) => {
                let sender = await UserModel.findUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type,
                     notification.isRead, sender._id, sender.username, sender.avatar);
            });
            resolve(await Promise.all(getNotifiContent));
            
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getNotifications: getNotifications,
    countNotifUnRead: countNotifUnRead,
    readMore: readMore
}