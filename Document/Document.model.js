const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  field1: {
    type: String,
    required: true,
  },
  field2: String,
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Document', documentSchema);
