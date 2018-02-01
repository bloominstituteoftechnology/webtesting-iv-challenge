const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

UserSchema.methods.getUserName = function () {
  return this.name;
};

UserSchema.methods.getUserEmail = function () {
  return this.email;
};

UserSchema.statics.getAllUsers = function (cb) {
  this.find({}, (err, users) => {
    if (err) return cb(err);
    cb(users);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
