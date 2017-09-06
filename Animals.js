const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  continent: {
    type: String,
    required: true
  }
});

AnimalSchema.methods.getName = function() {
  return this.name;
};

AnimalSchema.statics.getAllAnimals = function(cb) {
  Animals.find({}, (err, animals) => {
    if (err) return cb(err);
    cb(animals);
  });
};

const Animals = mongoose.model('Animals', AnimalSchema);

module.exports = Animals;