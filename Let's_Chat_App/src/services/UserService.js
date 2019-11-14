import UserModel from '../models/User';

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};

module.exports = {
  updateUser: updateUser
};