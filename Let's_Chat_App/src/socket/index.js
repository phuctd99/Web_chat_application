import chat from './chat/Chat';
import addNewContact from './contact/addNewContact';
import removeRequestContactSent from './contact/removeRequestContactSent';
import removeRequestContactReceive from './contact/removeRequestContactReceive';
import acceptRequestContactReceive from './contact/acceptRequestContactReceive';
import removeContact from './contact/removeContact'
const initSockets = io => {
    addNewContact(io);
    removeRequestContactSent(io);
    removeRequestContactReceive(io);
    acceptRequestContactReceive(io);
    removeContact(io);
    chat(io);
}

module.exports = initSockets;