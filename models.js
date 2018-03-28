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
//This broke everything, couldn't fix...
// BandSchema.statics.getBandByName = (bandName, cb) => {
//   Band.findOne({ name: bandName })
//     .then(res => {
//       if (res) cb(res);
//       else res.status(500).json('Band Name Not Found');
//     })
//     .catch(error => {
//       res.status(500).json(error)
//     })
// };

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;
