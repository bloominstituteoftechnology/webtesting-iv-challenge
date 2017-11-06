const mongoose = require('mongoose');

const VideoGameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  yearReleased: {
    type: Number,
    required: true
  }
});

VideoGameSchema.methods.getTitle = function() {
  return this.title;
};

VideoGameSchema.statics.getGames = function(cb) {
  return this.find({}, cb);
};

VideoGameSchema.statics.findByDeveloper = function(developer, cb) {
  return this.find({ developer }, cb);
}; 

module.exports = mongoose.model('VideoGame', VideoGameSchema);