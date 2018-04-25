const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeckSchema = new Schema({
  name: {
    type: String,
  },
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
