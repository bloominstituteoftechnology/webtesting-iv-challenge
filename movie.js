const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

MovieSchema.methods.getTitle = function() {
  return this.title;
};

MovieSchema.statics.getAllMovie = function(cb) {
  Movie.find({}, (err, movies) => {
    if (err) return cb(err);
  });
};

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
