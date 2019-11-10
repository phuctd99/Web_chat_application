import {validationResult} from 'express-validator/check';

let getLoginRegister = (req, res) => {
    return res.render('login-register/master');
};

let postRegister = (req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        console.log(errorArr);
    }
}

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister
};
