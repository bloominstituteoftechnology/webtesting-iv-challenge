const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
  },
  alcoholic: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: "Drink me baby, one more time."
  }
});

module.exports = mongoose.model('Drink', DrinkSchema);