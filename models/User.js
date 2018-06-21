const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'Password must be at least 8 characters.']
  }
});

userSchema.pre('save', function(next){
  bcrypt.hash(this.password, 12, (err, hash) => {
    if(err) next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.isValidPassword = function(testPassword){
  return bcrypt.compare(testPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
