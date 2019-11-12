import express from 'express';
import { home, auth } from './../controllers/index';
import {authValidator} from './../validation/index';
import passport from "passport";
import initPassportLocal from "./../controllers/LoginController";

initPassportLocal();
let router = express.Router();

let initRoutes = (app) => {
    //GET
    router.get('/', home.getHome);
    router.get('/login-register', auth.getLoginRegister);

    //POST
    router.post('/register', authValidator.register, auth.postRegister);
    router.get("/verify/:token", auth.verifyAccount);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
     }));
    return app.use('/', router);
};

module.exports = initRoutes;
