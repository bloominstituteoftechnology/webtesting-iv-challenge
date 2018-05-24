const mongoose = require('mongoose');

const friesSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  salt: {
    type: Boolean,
    required: true
  },
  ketchup: {
    type: Boolean,
    required: true
  }
});

friesSchema.method.superSizeMe = function() {
  this.size = 'super';
}

module.exports = mongoose.model('Fries', friesSchema);
