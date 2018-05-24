const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
  type: String,
  required: true,
  }
});

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;

      next();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = mongoose.model('User', UserSchema);