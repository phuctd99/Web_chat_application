import mongoose from "mongoose";
import bccryt from "bcrypt";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "ava.png"},
    role: {type: String, default: "user"},
    local: {
        email: {type: String, trim: true},
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        facebookId: String,
        token: String,
        email: {type: String, trim: true}
    },
    google: {
        googleId: String,
        token: String,
        email: {type: String, trim: true}
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findByEmail(email) {
        return this.findOne({"local.email": email}).exec(); 
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },
    findByToken(token) {
        return this.findOne({"local.verifyToken": token}).exec(); 
    },
    verify(token) {
        return this.findOneAndUpdate(
            {"local.verifyToken" : token},
            {
                "local.isActive": true,
                "local.verifyToken" : null
            }
        ).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    updateUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
    },
    updatePassword(id, hashedPassword) {
        return this.findByIdAndUpdate(id, {
          'local.password': hashedPassword
        }).exec();
    },
    findUserForAdding(userFilter, searchKey) {
    return this.find(
      {
        $and: [
          { _id: { $nin: userFilter } },
          { 'local.isActive': true },
          {
            $or: [
              { username: { $regex: new RegExp(searchKey, 'i') } },
              { 'local.email': { $regex: new RegExp(searchKey, 'i') } },
              { 'facebook.email': { $regex: new RegExp(searchKey, 'i') } },
              { 'google.email': { $regex: new RegExp(searchKey, 'i') } }
            ]
          }
        ]
      },
      {
        _id: 1,
        username: 1,
        address: 1,
        avatar: 1,
        'local.email': 1,
        'facebook.email': 1,
        'google.email': 1
      }
    ).exec();
  }
};
UserSchema.methods = {
    comparePassword(password) {
        return bccryt.compare(password, this.local.password);
    }
};

module.exports = mongoose.model("user", UserSchema);
