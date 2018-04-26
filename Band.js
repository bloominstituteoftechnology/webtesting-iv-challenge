const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

BandSchema.methods.getName = function() {
  return this.name;
};

BandSchema.methods.getGenre = function() {
  return this.genre;
};

BandSchema.statics.getAllBands = function(callBack) {
  Band.find({})
    .then(allBands => {
      callBack(allBands);
    })
    .catch(err => {
      callBack(err);
    });
};

const Band = mongoose.model('Band', BandSchema);
module.exports = Band;
