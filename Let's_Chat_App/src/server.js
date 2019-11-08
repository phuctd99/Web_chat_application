import express from "express";
import ConnectDB from "./config/ConnectDB";
import ContactModel from "./models/Contact";
var app = express();

ConnectDB();


app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(process.env.APP_PORT);
})