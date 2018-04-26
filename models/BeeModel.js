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

BeeSchema.methods.getBreed = function() {
  return this.breed;
};

const Bee = mongoose.model("Bee", BeeSchema);

module.exports = Bee;
