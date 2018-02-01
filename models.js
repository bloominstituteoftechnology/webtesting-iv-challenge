const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MagazineSchema = new Schema(
  {
    magazine: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publicationYear: {
      type: Number,
      required: true
    },
    pageRef: {
      type: Number,
      required: true, min: 1
    },
    createdAt: {
      type: Date,
      default: Date.now ,
    },
  },{versionKey: false}
);
// sets the entry date
MagazineSchema.pre('save', next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
