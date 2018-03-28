const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true
  },
  location: {
    required: true,
    type: String
  }
});

userSchema.methods.getUser = function() {
  return this.name;
};

userSchema.statics.getAllUsers = function(cb) {
  User.find({}, (err, users) => {
    if (err) console.error(err);
    cb(users);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
