const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  genre: {
    required: true,
    type: String,
  },
});

MovieSchema.methods.getMovieName = function () {
  return this.name;
}

MovieSchema.statics.getAllMovies = (cb) => {
  Movie.find({}, (err, movies) => {
    if (err) console.error(err);
    cb(movies);
  });
};

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;