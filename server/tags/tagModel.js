const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tagModel = mongoose.model('Tag', tagSchema);
module.exports = tagModel;
