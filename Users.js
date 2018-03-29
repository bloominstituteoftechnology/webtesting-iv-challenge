const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/users');

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true
  },
  location: {
      required: true,
      type: String,
  }
});

UserSchema.methods.getUser = function() {
  return this.name;
}

UserSchema.statics.retrieveAllUsers = (cb) => {
  User.find({}, (err, users) => {
    if (err) console.error(err);
    cb(users);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;