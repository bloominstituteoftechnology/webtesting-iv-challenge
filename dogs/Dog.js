const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DogSchema = new mongoose.Schema({
    breed: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

DogSchema.pre('save', function(next) {
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

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;