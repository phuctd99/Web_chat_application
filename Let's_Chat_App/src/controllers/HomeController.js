import {notification, contact} from "./../services/index";

let getHome = async (req, res) => {
    const userId = req.user._id;
    //only 10 items one time
    let notifications = await notification.getNotifications(userId);
    //lay so thong bao chua doc
    let countNotifUnRead = await notification.countNotifUnRead(userId);
    
    // get contact 
    let contacts = await contact.getContacts(userId);
    // get contact send
    let contactsSent = await contact.getContactsSent(userId);
    // get contact reviece
    let contactsReviece = await contact.getContactsReviece(userId);

    //count contacts
    let countAllContacts = await contact.countAllContacts(userId);
    let countAllContactsSent = await contact.countAllContactsSent(userId);
    let countAllContactsReviece = await contact.countAllContactsReviece(userId);
    let contactedUsers = await contact.getAllContacts(userId);

    return res.render('main/home/home', {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnRead: countNotifUnRead,
        notifications: notifications,
        contacts: contacts,
        contactsSent: contactsSent,
        contactsReviece: contactsReviece,
        countAllContacts: countAllContacts,
        countAllContactsSent: countAllContactsSent,
        countAllContactsReviece: countAllContactsReviece,
        contactedUsers: contactedUsers
    });
};

module.exports = {
    getHome: getHome
};
  