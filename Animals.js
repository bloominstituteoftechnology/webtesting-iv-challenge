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

const Animals = mongoose.model('Animals', AnimalSchema);

module.exports = Animals;