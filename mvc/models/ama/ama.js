const mongoose = require('mongoose');
const { Schema } = mongoose;
// const mongodAuth = require('../../../config').mongodAuth;

// mongoose.connect('mongodb://localhost/server-testing_db', mongodAuth);
mongoose.connect('mongodb://localhost/server-testing_db');

const AmaSchema = new Schema({
  question: {
    required: true,
    type: String,
    unique: true,
  },
  answer: {
    type: String,
  },
  answered: {
    required: true,
    type: Boolean,
    default: false,
  },
  createdOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

AmaSchema.methods.getQuestion = function() {
  return this.question;
};

AmaSchema.methods.getAnswer = function() {
  return this.answer || 'Question not answered yet.';
};

AmaSchema.statics.getAllAmas = cb => {
  Ama.find({}, (err, amas) => {
    if (err) console.log(err);

    cb(amas);
  });
};

const Ama = mongoose.model('Ama', AmaSchema);

module.exports = Ama;
