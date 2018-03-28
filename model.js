const mongoose = require('mongoose');

const { Schema } = mongoose;

const ToppingsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

ToppingsSchema.methods.addATopping = function() {

};