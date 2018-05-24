const mongoose = require('mongoose');

const Food = new mongoose.Schema({
  name: String,
  price: Number
})

module.exports = mongoose.model('Food', Food);