const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

FoodSchema.methods.getTitle = function() {
  return this.title;
};

FoodSchema.statics.getAllFood = function(cb) {
  Food.find({}, (err, foods) => {
    if (err) return cb(err);
    cb(foods);
  });
};

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
