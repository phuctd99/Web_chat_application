import session from "express-session";
import connectMongo from "connect-mongo";

let mongoStore = connectMongo(session);

/**
 * 
 */
let sessionStore = new mongoStore({
    url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect: true,
    autoRemove: "native" // default 
});
let config = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        // store
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 ngày - 1000ms = 1s
        }
    }));
};

module.exports = module.exports = {
    config: config,
    sessionStore: sessionStore
  }; 
