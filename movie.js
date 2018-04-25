const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
