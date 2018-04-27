const mongoose = require('mongoose');
const { Schema } = mongoose;

const BattlefieldSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  kills: {
    type: String,
    required: true,
    unique: false
  },
  deaths: {
    type: String,
    required: true,
    unique: false
  }
});

BattlefieldSchema.methods.getName = function() {
  return this.name;
};

BattlefieldSchema.statics.getAllData = async function() {
  try {
    const data = await Battlefield.find({});
    return data;
  } catch (error) {
    return error;
  }
};

const Battlefield = mongoose.model('Battlefield', BattlefieldSchema);

module.exports = Battlefield;
