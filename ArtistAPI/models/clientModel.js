const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
})
const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;