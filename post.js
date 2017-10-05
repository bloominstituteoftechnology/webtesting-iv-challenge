const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

postSchema.methods.getTitle = function() {
  return this.title;
}

postSchema.statics.getAllTitles = function(cb) {
  return this.find({}, 'title', cb);
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
