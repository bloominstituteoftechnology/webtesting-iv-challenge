const mongoose = require('mongoose');
const { Schema } = mongoose;

const PainterSchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  style: {
    type: String,
    required: true,
  }
});

PainterSchema.methods.getPainterName = function() {
  return this.name;
};

PainterSchema.statics.getAllPainters = (cb) => {
  Painter.find({}, (err, ptr) => {
    if(err) return cb(err);
    cb(ptr);
  })
    // .then(sg => cb(sg))
    // .catch(err => console.error(err));
};

const Painter = mongoose.model('Painter', PainterSchema);

module.exports = Painter;