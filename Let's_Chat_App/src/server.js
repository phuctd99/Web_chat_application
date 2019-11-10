import express from "express";
import ConnectDB from "./config/ConnectDB";
import ContactModel from "./models/Contact";
import initRoutes from './routers/Router';
import configViewEngine from './config/ConfigView';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import configSession from "./config/session";

var app = express();

ConnectDB();

configSession(app);

configViewEngine(app);

app.use(bodyParser.urlencoded({extended: true}));

app.use(connectFlash());

initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(process.env.APP_PORT);
})
