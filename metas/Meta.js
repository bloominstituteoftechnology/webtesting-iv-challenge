const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Meta = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('Meta', Meta);

//hash password
