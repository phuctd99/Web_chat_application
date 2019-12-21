import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "./../models/User";
import {errorMessage, successMessage} from "./../../lang/Vie";


let localStratery = passportLocal.Strategy;

let initPassLocal = () => {
    passport.use(new localStratery({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done)=>{
        try {
            let user = await UserModel.findByEmail(email); 
            if (!user) {
                return done(null, false, req.flash("errors", errorMessage.login_failed)); 
            }
            if (!user.local.isActive) {
                return done(null, false, req.flash("errors", errorMessage.account_is_actived)); 
            }
            let checkPassword = await user.comparePassword(password);
            if (!checkPassword) {
                return done(null, false, req.flash("errors", errorMessage.login_failed)); 
            }
            return done(null, user, req.flash("success", successMessage.loginSuccess(user.username)));
        } catch (error) {
            // console.log(error);
            return done(null, false, req.flash("errors,", errorMessage.server_error));
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            return done(err, user);
        });
    });
}

module.exports = initPassLocal;