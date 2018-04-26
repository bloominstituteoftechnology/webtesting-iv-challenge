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

BandSchema.methods.getName = function() {
  return this.name;
  return this.genre;
  return this.numberOfMembers;
  return this.yearFounded;
};
BandSchema.methods.getGenre = function() {
  return this.genre;
};
BandSchema.methods.getMembers = function() {
  return this.numberOfMembers;
};
BandSchema.methods.getYear = function() {
  return this.yearFounded;
};

BandSchema.statics.getAllBands = function(cb) {
  Band.find({})
    .then(allBands => {
      cb(allBands);
    })
    .catch(err => {
      cb(err);
    });
};

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
