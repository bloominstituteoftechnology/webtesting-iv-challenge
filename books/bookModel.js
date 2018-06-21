const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  author: { type: String, required: true },
  genre: { type: String, required: true },
  pages: { type: Number, required: true }
});

module.exports = mongoose.model("Book", bookSchema);
