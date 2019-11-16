import {check} from 'express-validator/check';
import {validationMessage} from './../../lang/Vie';

let register = [
    check('email', validationMessage.email_incorret)
        .isEmail()
        .trim(),
    check('gender', validationMessage.gender_incorrect)
        .isIn(['female', 'male']),
    check('password', validationMessage.password_incorrect)
        .isLength({min: 1}),
        // .matches(/^(?=.*[a-z|A-Z])(?=.*\d)[a-z|A-Z\d]{8,}$/),
    check('password_confirmation', validationMessage.confirmedPassword_incorrect)
        .custom((value, {req}) => {
            return value === req.body.password
        })
];

module.exports = {
    register: register
}