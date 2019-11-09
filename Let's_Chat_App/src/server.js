import express from "express";
import ConnectDB from "./config/ConnectDB";
import ContactModel from "./models/Contact";
import initRoutes from './routers/Router';
import configViewEngine from './config/ConfigView';
var app = express();

ConnectDB();

configViewEngine(app);

initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(process.env.APP_PORT);
})
