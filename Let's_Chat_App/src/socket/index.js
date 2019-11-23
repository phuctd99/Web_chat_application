import chat from './chat/Chat';
import addNewContact from './contact/addNewContact';
import removeRequestContact from './contact/removeRequestContact';
const initSockets = io => {
    addNewContact(io);
    removeRequestContact(io);
    let users = {};
    chat(users, io);
}

module.exports = initSockets;