import UserModel from '../models/User';
import { errorMessage } from '../../lang/Vie';
import brcypt from 'bcrypt';

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};
const salt = 7;
let updatePassword = (id, item) => {
  return new Promise(async (resolve, rejects) => {
    let currentUser = await UserModel.findUserById(id);
    if (!currentUser) {
      return rejects(errorMessage.user_not_found);
    }

    const checkCurrentPassword = await currentUser.comparePassword(
      item.currentPassword
    );
    if (!checkCurrentPassword) {
      return rejects(errorMessage.password_incorrect);
    }

    let salt = brcypt.genSaltSync(salt);
    await UserModel.updatePassword(
      id,
      brcypt.hashSync(item.newPassword, salt)
    );
    resolve(true);
  });
};
module.exports = {
  updateUser: updateUser,
  updatePassword: updatePassword
};