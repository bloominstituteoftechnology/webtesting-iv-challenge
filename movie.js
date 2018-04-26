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

MovieSchema.methods.getTitle = function() {
  return this.title;
};

MovieSchema.statics.getAllMovies = function(callBack) {
  Movie.find({})
    .then(allMovies => {
      callBack(allMovies);
    })
    .catch(err => {
      callBack(err);
    });
};

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
