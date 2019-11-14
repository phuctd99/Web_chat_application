import multer from 'multer';
import uuidv4 from 'uuid/v4';
import fsExtra from 'fs-extra';
import { app } from '../config/App';
import { errorMessage, successMessage } from '../../lang/Vie';
import { user } from '../services/index';

let storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directiory);
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type;
    if (math.indexOf(file.mimetype) === -1) {
      return callback(errorMessage.avatar_type, null);
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, avatarName);
  }
});
let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: app.avatar_limit_size }
}).single('avatar');
let updateAvatar = (req, res) => {
  avatarUploadFile(req, res, async err => {
    if (err) {
      if (err.message) {
        return res.status(500).send(errorMessage.avatar_size);
      }
      return res.status(500).send(err);
    }
    try {
      // update user
      let updateUserItem = {
        avatar: req.file.filename,
        updateAt: Date.now()
      };
      let update = await user.updateUser(req.user._id, updateUserItem);

      // remove old avatar
      await fsExtra.remove(`${app.avatar_directiory}/${update.avatar}`);
      let result = {
        message: successMessage.avatar_updated,
        imageSrc: `/images/users/${req.file.filename}`
      };
      // console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      // console.log(error);
      return res.status(500).send(error);
    }
  });
};

module.exports = {
  updateAvatar: updateAvatar
};