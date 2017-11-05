const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  isbn: String,
  author: {
    type: String,
    required: true
  },
  pages: Number,
  genre: [String]
});

BookSchema.methods.getAuthor = function() {
  return this.author;
}

BookSchema.statics.findByAuthor = async function(name) {
  const booksByAuthor = await this.model('Book').find({author: name})
    .limit(15)
    .sort('-title');
  return booksByAuthor;
}

module.exports = mongoose.model('Book', BookSchema);
