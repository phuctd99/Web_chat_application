import {check} from 'express-validator/check';
import {validationMessage} from './../../lang/Vie';

const updateInfo = [
    check('username', validationMessage.update_username)
    .optional()
    .isLength({ min: 3, max: 17 })
    .matches(
      /^[\s0-9a-zA-Z_ÀÁÂÃAÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    ),
    check('gender', validationMessage.update_gender)
    .optional()
    .isIn(['male', 'female']),
    check('address', validationMessage.update_address)
    .optional()
    .isLength({ min: 3, max: 30 }),
    check('phone', validationMessage.update_phone)
    .optional()
    .matches(/^(0)[0-9]{9}$/)
];

module.exports = {
    updateInfo: updateInfo
}