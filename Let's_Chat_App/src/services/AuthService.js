import UserModel from "./../models/User";
import bcrypt from 'bcrypt';
import uuidv4 from "uuid/v4";
import {errorMessage, successMessage, mailMessage} from "./../../lang/Vie";
import mailer from "./../config/ConfigMailer";


let salt = 7;

let register =  (email, gender, password, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            if (userByEmail.deteleAt != null){
                return reject(errorMessage.account_is_removed); 
            }
            if (userByEmail.local.isActive != null){
                return reject(errorMessage.account_is_activated); 
            }
            return reject(errorMessage.account_is_used);
        }
        let salt = bcrypt.genSaltSync(salt);
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };
        let user = await UserModel.createNew(userItem);
        console.log(user);
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`
        mailer(email, mailMessage.subjectToRegisterAccount, mailMessage.templaceToRegisterAccount(linkVerify))
            .then(success => {
                resolve(successMessage.userCreated(user.local.email));
            })
            .catch(async (error) => {
                await UserModel.removeById(user._id);
               console.log(error); 
               reject(mailMessage.send_failed);
            });
    });
};
let verifyAccount = (token) => {
    return new Promise(async (resolve, reject) => {
        let userByToken = await UserModel.findByToken(token);
        if (!userByToken) {
            return reject(errorMessage.token_undefined);
        }
        await UserModel.verify(token);
        resolve(successMessage.account_actived);
    });
}

let resetPassword =  (email, id) => {
    return new Promise( (resolve, reject) => {
    let linkResetPassword = `http://localhost:${process.env.APP_PORT}/reset-password/${id}`
    console.log(linkResetPassword)
    mailer(email, mailMessage.subjectToResetPassword, mailMessage.templateToResetPassword(linkResetPassword))
        .then(success => {
            resolve(successMessage.password_reseted);
        })
        .catch(error => {
            console.log(error)
            reject(mailMessage.send_failed);
        }) 
    })
}


module.exports = {
    register: register,
    verifyAccount: verifyAccount,
    resetPassword: resetPassword 
}; 