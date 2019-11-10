import UserModel from "./../models/User";
import bcrypt from 'bcrypt';
import uuidv4 from "uuid/v4";
import {errorMessage, successMessage} from "./../../lang/Vie";

let salt = 7;

let register =  (email, gender, password) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            if (userByEmail.deteleAt != null){
                return reject(errorMessage.account_removed); 
            }
            if (userByEmail.local.isActive != null){
                return reject(errorMessage.account_isActive); 
            }
            return reject(errorMessage.account_in_use);
        }
        let salt = bcrypt.genSaltSync(salt);
        let userItem = {
            userName: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };
        let user = await UserModel.createNew(userItem);
        resolve(successMessage.userCreated(user.local.email));
        console.log(user);
    });
};



module.exports = {
    register: register 
}; 