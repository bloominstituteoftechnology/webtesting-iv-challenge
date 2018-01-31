const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

PersonSchema.methods.getFullName = function() {
  return this.firstName + " " + this.lastName;
}

PersonSchema.statics.findByFirstName = function(cb) {
  return this.findOne({ firstName }).exec(cb);
}

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;