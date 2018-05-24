const mongoose = require('mongoose');
const commentary = require('../Commentary/Commentary');

const verseSchema = new mongoose.Schema({
  passage: {
    type: String,
    unique: true,
  },
  scriptureBody: String,
  bibleVersion: String,
});



module.exports = mongoose.model('Verse', verseSchema);