const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Pilot = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('Pilot', Pilot);
