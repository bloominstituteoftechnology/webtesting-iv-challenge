const mongoose = require('mongoose');
const db = require('./db');
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

PersonSchema.statics.findByFirstName = function(firstName) {
  return this.findOne({ firstName }).exec();
}

let Person;
try {
  Person = db.model('Person', PersonSchema);
} catch(err) {
  Person = db.model('Person');
}
module.exports = Person;