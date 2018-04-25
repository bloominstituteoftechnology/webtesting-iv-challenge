const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
  name: {
    type: String,
  },
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
