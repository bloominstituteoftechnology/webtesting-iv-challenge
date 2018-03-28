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
    if (err) console.error(err);
    cb(bands);
  });
};

BandSchema.statics.getBandByName = (bandName, cb) => {
  Band.findOne({ name: bandName }, (err, band) => {
    if (err) console.error(err);
    cb(band);
  });
};

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
