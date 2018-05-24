const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notesSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  notes: {
      type: Object,
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

module.exports = mongoose.model('Notes', notesSchema);