const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})

RecipeSchema.methods.getTitle = function() {
  return this.title;
}

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;