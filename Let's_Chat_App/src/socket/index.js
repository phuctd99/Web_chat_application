import chat from './chat/Chat';
import addNewContact from './contact/addNewContact';
import removeRequestContactSent from './contact/removeRequestContactSent';
const initSockets = io => {
    addNewContact(io);
    removeRequestContactSent(io);
    let users = {};
    chat(users, io);
}

module.exports = initSockets;