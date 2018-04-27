const mongoose = require('mongoose');

const tagModel = require('../tags/tagModel');

const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: [{ type: ObjectId, ref: 'Tag' }],
  },
  { timestamps: true }
);

const noteModel = mongoose.model('Note', noteSchema);
module.exports = noteModel;
