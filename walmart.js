const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  brandName: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  stock: {
    type: String,
    default: "Available"
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;