import express from 'express';
import { home, auth } from './../controllers/index';
import {authValidator} from './../validation/index';

let router = express.Router();

let initRoutes = (app) => {
    //GET
    router.get('/', home.getHome);
    router.get('/login-register', auth.getLoginRegister);

    //POST
    router.post('/register', authValidator.register, auth.postRegister);
    router.get("/verify/:token", auth.verifyAccount);
    return app.use('/', router);
};

module.exports = initRoutes;
