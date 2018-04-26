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
