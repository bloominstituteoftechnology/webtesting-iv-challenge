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

// http://mongoosejs.com/docs/guide.html#methods

// // Linter unhappy: https://eslint.org/docs/rules/func-names
// FoodSchema.methods.getName = function() {
//   return this.name;
// };
FoodSchema.methods.getName = function getName() {
  return this.name;
};

// Function hoisting? Async tests with stubs? mongoose mpromises?????????????????
// const Food = mongoose.model('Food', FoodSchema); <~~~~ LINTER WANTS THIS HERE BUT THIS BREAKS TESTS - WHY???????

FoodSchema.statics.getAllFoods = function getAllFoods(cb) {
  Food.find({}, (err, food) => {
    if (err) return cb(err);
    cb(food);
  });
};

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
