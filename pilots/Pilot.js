const mongoose = require('mongoose');
const { Schema } = mongoose;

const PilotSchema = new Schema({
  name: {
    type: String,
  },
});

const Pilot = mongoose.model('Pilot', PilotSchema);

module.exports = Pilot;
