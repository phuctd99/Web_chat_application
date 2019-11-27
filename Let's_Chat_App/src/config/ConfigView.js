import express from "express";
import expressEjsExtend from "express-ejs-extend";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // thực hiện lấy css, js
    app.engine("ejs",expressEjsExtend); // config
    app.set("view engine","ejs"); // config nhận file .ejs
    app.set("views", "./src/views"); // mặc định sẽ trong các file trong virews => đặt lại đọc các file trong ./src/views
}

module.exports = configViewEngine;
