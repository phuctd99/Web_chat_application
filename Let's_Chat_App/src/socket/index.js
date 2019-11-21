import chat from './chat/Chat';

const initSockets = io => {
    let users = {};
    chat(users, io);
}

module.exports = initSockets;
