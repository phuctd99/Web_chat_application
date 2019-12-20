import {validationResult} from 'express-validator/check';
import {auth} from "./../services/index";
import User from '../models/User';
import bcrypt from 'bcrypt';
import authService from '../services/AuthService';
import {successMessage, validationMessage} from "./../../lang/Vie";

let getLoginRegister = (req, res) => {
    return res.render("login-register/master", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let getResetPassword = (req, res) => {
    const id = req.params.id;
    res.render("login-register/resetPassword/resetPassword",{
        userId: id,
        errors: req.flash("errors"),
        success: req.flash("success")
    })
}

let resetPassword = async(req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    let rePassword = req.body.rePassword;
    let salt = bcrypt.genSaltSync(7);
    try {
        if(password !== rePassword) {
            req.flash("errors",validationMessage.confirmedPassword_incorrect);
            return res.redirect(`/reset-password/${id}`)
        }
        if(password === rePassword) {
            let user = await User.findOneAndUpdate({_id: id},{'local.password': bcrypt.hashSync(password, salt) });
            user.save();
            req.flash("success",successMessage.password_updated);
            return res.redirect('/login-register');
        }  
    } catch (error) {
        res.status(500).send(error);
    }
}
let postRegister = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        console.log(errorArr);
        req.flash("errors", errorArr);
        return res.redirect("/login-register");
    }
    try {
        let createUserSuccess = await auth.register(req.body.email, 
            req.body.gender, req.body.password, req.protocol, req.get("host"));
        successArr.push(createUserSuccess);
        req.flash("success", successArr);
        return res.redirect("/login-register");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/login-register");
    }
};
let verifyAccount = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    try {
        let verifySuccess = await auth.verifyAccount(req.params.token);
        successArr.push(verifySuccess);
        req.flash("success", successArr);
        return res.redirect("/login-register");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/login-register");
    } 
}

let getLogout = (req, res) => {
    req.logout();
    req.flash("success", successMessage.logoutSuccess);
    return res.redirect("/login-register");
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login-register");
    }
    next();
};
let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

let forgotPassword = async(req, res) => {
    let email  = req.body.email;
    try {
        let user = await User.findByEmail(email);
        if(!user) {
            req.flash("errors", "Tài khoản này chưa được đăng ký trên hệ thống"); 
            return res.redirect("/login-register");
        }
        if(user) {
            let id = user._id;
            authService.resetPassword(email, id);
            console.log(user._id);
            req.flash("success","Check email để lấy lại mật khẩu");
            return res.redirect("/login-register");
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getLoginRegister: getLoginRegister,
    getResetPassword: getResetPassword,
    postRegister: postRegister,
    verifyAccount: verifyAccount,
    getLogout: getLogout,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
};
