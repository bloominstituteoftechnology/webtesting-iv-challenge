const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    default: new Date()
  }
});

BookSchema.methods.getTitle = function() {
  return this.title;
};

BookSchema.statics.getAllTitles = cb => {
  Book.find({}, (err, books) => {
    if (err) console.error(err);
    cb(books);
  });
};

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;