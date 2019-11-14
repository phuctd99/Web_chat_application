import express from "express";
import ConnectDB from "./config/ConnectDB";
import initRoutes from './routers/Router';
import configViewEngine from './config/ConfigView';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import configSession from "./config/Session";
import passport from "passport";

var app = express();

ConnectDB();

configSession(app);

configViewEngine(app);

app.use(bodyParser.urlencoded({extended: true}));

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(process.env.APP_PORT);
})
