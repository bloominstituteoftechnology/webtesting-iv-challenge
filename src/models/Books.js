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

module.exports = mongoose.model('Book', BookSchema);
