const mongoose = require('mongoose');
const { Schema } = mongoose;

const BandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
});

BandSchema.methods.getGenre = function() {
  return this.genre;
};

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
