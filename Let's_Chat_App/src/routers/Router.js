import express from 'express';
import { home, auth, user, contact, notification, message } from './../controllers/index';
import {authValidator, userValid} from './../validation/index';
import passport from "passport";
import initPassportLocal from "./../controllers/LoginController";
import initPassportFacebook from "../controllers/passportController/facebook";
import initPassportGoogle from "../controllers/passportController/google";
import admin from "../controllers/adminController"


initPassportLocal();
initPassportFacebook();
initPassportGoogle();
let router = express.Router();

let initRoutes = (app) => {

    router.get('/get-user',auth.checkLoggedIn, admin.checkIsAdmin, admin.dashboard);

    router.post('/block-account', auth.checkLoggedIn, admin.checkIsAdmin, admin.blockAccount);

    router.post('/unblock-account', auth.checkLoggedIn, admin.checkIsAdmin, admin.unblockAccount);
    

    router.post('/forgot-password', auth.checkLoggedOut, auth.forgotPassword);

    router.post('/reset-password/', auth.checkLoggedOut, auth.resetPassword);
    router.get('/login-register',auth.checkLoggedOut, auth.getLoginRegister);
    router.get('/reset-password/:id', auth.checkLoggedOut, auth.getResetPassword);
    router.post("/register", auth.checkLoggedOut, authValidator.register, auth.postRegister);
    router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
     }));

     router.get('/auth/facebook', auth.checkLoggedOut, passport.authenticate('facebook', {scope: ["email"]}));
     router.get('/auth/facebook/callback',auth.checkLoggedOut, passport.authenticate('facebook', {
         successRedirect: '/',
         failureRedirect: '/login-register'
     })); 
    
     router.get('/auth/google' ,auth.checkLoggedOut, passport.authenticate('google', {scope: ["email"]}));
     router.get('/auth/google/callback' ,auth.checkLoggedOut, passport.authenticate('google', {
         successRedirect: '/',
         failureRedirect: '/login-register'
     }))

    router.get(
        '/contact/find-users/:keyword',
        auth.checkLoggedIn,
        contact.findUsers
      );
    router.get('/notification/read-more',auth.checkLoggedIn,notification.readMore);
    router.put('/notification/mark-readed',auth.checkLoggedIn,notification.markAllReaded);
    
    
    router.put(
        '/user/update-password',
        auth.checkLoggedIn,
        userValid.updatePassword,
        user.updatePassword
    );

    router.get('/contact/read-more-contacts',auth.checkLoggedIn,contact.readMoreContacts);
    router.get('/contact/read-more-contacts-sent',auth.checkLoggedIn,contact.readMoreContactsSent);
    router.get('/contact/read-more-contacts-reviece',auth.checkLoggedIn,contact.readMoreContactsReviece);
    router.post('/contact/add-new', auth.checkLoggedIn, contact.addNew);
    router.delete('/contact/remove-contact', auth.checkLoggedIn, contact.removeContact);
    router.delete(
        '/contact/remove-request-contact-sent',
        auth.checkLoggedIn,
        contact.removeRequestContactSent
    ); 
    router.delete(
        '/contact/remove-request-contact-receive',
        auth.checkLoggedIn,
        contact.removeRequestContactReceive
    );
    router.put(
        '/contact/accept-request-contact-receive',
        auth.checkLoggedIn,
        contact.acceptRequestContactReceive
    );  

    router.get('/get-all-contacts', contact.getAllContacts);
    
    router.get('/', auth.checkLoggedIn, home.getHome);
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);
    router.put('/user/update-avatar', auth.checkLoggedIn, user.updateAvatar);
    router.put(
        '/user/update-info',
        auth.checkLoggedIn,
        userValid.updateInfo,
        user.updateInfo
    );
    router.put(
        '/user/update-password',
        auth.checkLoggedIn,
        userValid.updatePassword,
        user.updatePassword
    );
    router.get('/get-messages', message.getAllMessages);

    return app.use('/', router);
};

module.exports = initRoutes;
