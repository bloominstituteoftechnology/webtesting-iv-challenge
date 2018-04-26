const mongoose = require('mongoose');
const { Schema } = mongoose;

const BandSchema = new Schema({
  // how to nest albumReleaseDate and albumFavSong w/in album?
  name: { type: String, required: true },
  genre: { type: String, required: true },
  album: { type: String, required: true },
  albumReleaseDate: { type: String },
  albumHitSong: { type: String },
});

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
