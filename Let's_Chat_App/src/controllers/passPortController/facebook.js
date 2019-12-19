import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "../../models/User"
import {errorMessage, successMessage} from "../../../lang/Vie";

let FacebookStrategy = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbCallbackUrl = process.env.FB_CALLBACK_URL;

/**
 * valid user account type: Facebook
 */
let initPassportFacebook = () => {
    passport.use(new FacebookStrategy({
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackUrl, 
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async(req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByFacebookUid(profile.id);
            if(user) {
                return done(null, user, req.flash("success",successMessage.loginSuccess(user.username)));
            }
            
            let newUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {isActive: true},
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            };
            let newUser = await UserModel.createNew(newUserItem);
            return done(null, newUser, req.flash("success", successMessage.loginSuccess(newUser.username)));
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", errorMessage.server_error))
        }
    }));
    //Save userId to session
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    //this is called by passport.session()
    //return userInfo to req.user
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
        .then(user => {
            return done(null, user);        
        })
        .catch(error => {
            return done(error, null)
        });
    });
};

module.exports = initPassportFacebook;