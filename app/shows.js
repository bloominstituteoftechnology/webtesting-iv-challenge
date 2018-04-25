const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  network: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Show', showSchema);
