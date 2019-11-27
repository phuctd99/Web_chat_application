import NotificationModel from '../models/Notification';
import UserModel from '../models/User';
let getNotifications = (currentUserId, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.model
                .getByUserIdAndLimit(currentUserId, limit);
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

module.exports = {
    getNotifications: getNotifications,
    countNotifUnRead: countNotifUnRead
}