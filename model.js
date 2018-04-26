const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  bandName: {
    type: String,
    required: true
  },
  bandGenre: {
    type: String,
    required: true
  }
});

BandSchema.methods.getName = function() {
  return this.bandName;
};

BandSchema.methods.getGenre = function() {
  return this.bandGenre;
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
