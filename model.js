const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  bandName: {
    type: String,
    required: true
  },
  bandGenre: {
    type: String,
    required: true
  }
});

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;
