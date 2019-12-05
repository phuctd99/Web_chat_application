import chat from './chat/Chat';
import addNewContact from './contact/addNewContact';
import removeRequestContactSent from './contact/removeRequestContactSent';
import removeRequestContactReceive from './contact/removeRequestContactReceive';
import acceptRequestContactReceive from './contact/acceptRequestContactReceive'
const initSockets = io => {
    addNewContact(io);
    removeRequestContactSent(io);
    removeRequestContactReceive(io);
    acceptRequestContactReceive(io);
    let users = {};
    chat(users, io);
}

module.exports = initSockets;