const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notesSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
      type: String,
      required: false,
  },
  title: String,
  
});

notesSchema.pre('save', function(next) {
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
notesSchema.methods.checkPassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};
module.exports = mongoose.model('Notes', notesSchema);