const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema



const definition = {
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true
  }
}
const options = {
  timestamp: true
}
const userSchema = new Schema(definition, options);

userSchema.pre('save', function (next) {
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
userSchema.methods.checkPassword = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

const userModel = mongoose.model('User', userSchema, 'users');
module.exports = userModel;