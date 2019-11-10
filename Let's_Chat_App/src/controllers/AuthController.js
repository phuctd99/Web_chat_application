import {validationResult} from 'express-validator/check';
import {auth} from "./../services/index";

let getLoginRegister = (req, res) => {
    return res.render("login-register/master", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

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

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister,
    verifyAccount: verifyAccount
};
