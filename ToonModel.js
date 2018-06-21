const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ToonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    franchise: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
})

ToonSchema.pre('save', function(next) {
    bcrypt
      .hash(this.password, 10)
      .then(hash => {
        this.password = hash;
  
        next();
      })
      .catch(err => {
        console.log(err);
      });
  });

const toonsModel = mongoose.model('Toon', ToonSchema);

module.exports = toonsModel;
