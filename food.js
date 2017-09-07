const mongoose = require('mongoose');

const { Schema } = mongoose;
// const Schema = mongoose.Schema; // <~~~ same as line 3

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reaction: {
    type: String,
    required: false,
    default: 'yum',
  }
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
