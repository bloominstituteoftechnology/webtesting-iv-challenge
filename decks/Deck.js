const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Deck = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  commander: {
    type: String,
    required: true,
  },
  themes: {
    type: String,
    required: true,
  },
  pilot: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('Deck', Deck);
