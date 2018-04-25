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
  },
  numberOfMembers: {
    type: Number,
    required: true
  },
  yearFounded: {
    type: Number,
    required: true
  }
});

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
