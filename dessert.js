const mongoose = require('mongoose');
const { Schema } = mongoose;

const DessertSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
});

const Dessert = mongoose.model('Dessert', DessertSchema);

module.exports = Dessert;
