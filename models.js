const mongoose = require('mongoose');
const { Schema } = mongoose;

const BandSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  genre: {
    required: true,
    type: String,
  },
});

BandSchema.methods.getBandName = function() {
  return this.name;
};

BandSchema.statics.getAllBands = (cb) => {
  Band.find({}, (err, bands) => {
    if (err) console.log(err);
    cb(bands);
  });
};

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
