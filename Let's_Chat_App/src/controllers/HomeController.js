import {notification, contact} from "./../services/index";

let getHome = async (req, res) => {
    //only 10 items one time
    let notifications = await notification.getNotifications(req.user._id);
    //lay so thong bao chua doc
    let countNotifUnRead = await notification.countNotifUnRead(req.user._id);
    
    // get contact 
    let contacts = await contact.getContacts(req.user._id);
    // get contact send
    let contactsSent = await contact.getContactsSent(req.user._id);
    // get contact reviece
    let contactsReviece = await contact.getContactsReviece(req.user._id);

    //count contacts
    let countAllContacts = await contact.countAllContacts(req.user._id);
    let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
    let countAllContactsReviece = await contact.countAllContactsReviece(req.user._id);

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
        countAllContactsReviece: countAllContactsReviece

    });
};

module.exports = {
    getHome: getHome
};
  