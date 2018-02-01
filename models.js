const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  firstName: {
    required: false,
    type: String
  },
  lastName: {
    required: false,
    type: String
  },
  userEmail: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

UserSchema.methods.getUserEmail = function() {
  return this.userEmail;
};

UserSchema.statics.getAllUsers = function(cb) {
  User.find({}, (err, users) => {
    if (err) return cb(err);
    cb(users);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
