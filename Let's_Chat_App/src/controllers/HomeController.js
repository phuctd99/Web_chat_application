import {notification} from "./../services/index";

let getHome = async (req, res) => {
    //only 10 items one time
    let notifications = await notification.getNotifications(req.user._id);
    //lay so thong bao chua doc
    let countNotifUnRead = await notification.countNotifUnRead(req.user._id);
    return res.render('main/home/home', {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnRead: countNotifUnRead
    });
};

module.exports = {
    getHome: getHome
};
  