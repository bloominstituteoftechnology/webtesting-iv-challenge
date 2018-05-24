const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const commentarySchema = new mongoose.Schema({
  authorFirstName: String,
  authorLastName: String,
  commentaryTitle: String,
  quoteBody: String,
  scripture: String,
});

module.exports = mongoose.model('Commentary', commentarySchema);