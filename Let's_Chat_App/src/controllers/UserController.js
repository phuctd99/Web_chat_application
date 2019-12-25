import multer from 'multer';
import uuidv4 from 'uuid/v4';
import fsExtra from 'fs-extra';
import { app } from '../config/App';
import { errorMessage, successMessage } from '../../lang/Vie';
import { user } from '../services/index';
import {validationResult} from 'express-validator/check';
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
      console.log(update.avatar);
      if (update.avatar !== 'ava.png'){
        await fsExtra.remove(`${app.avatar_directiory}/${update.avatar}`);
      }
      let result = {
        message: successMessage.info_updated,
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

let updateInfo = async (req, res) => {
  const errorArr = [];
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    return res.status(500).send(errorArr);
  }

  try {
    let updateUserItem = req.body;
    await user.updateUser(req.user._id, updateUserItem);
    let result = {
      message: successMessage.info_updated
    };
    // console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
let updatePassword = async (req, res) => {
  const errorArr = [];
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    return res.status(500).send(errorArr);
  }
  try {
    let updateUserItem = req.body;
    await user.updatePassword(req.user._id, updateUserItem);
    let result = {
      message: successMessage.password_updated
    };
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};


module.exports = {
  updateAvatar: updateAvatar,
  updateInfo: updateInfo,
  updatePassword: updatePassword
};