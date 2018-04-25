const mongoose = require("mongoose");
const { Schema } = mongoose;

const BeeSchema = new Schema({
  breed: {
    type: String,
    required: true
  },
  honey: {
    type: String,
    required: true
  },
  gentleness: { type: String },
  swarming: {
    type: String
  },
  propolis: {
    type: String
  }
});

const Bee = mongoose.model("Bee", BeeSchema);

module.exports = Bee;
