const mongoose = require('mongoose');
const { Schema } = mongoose;


const CharSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    race: {
        type: String,
        required: true
    },
    planet: {
      type: String,
      required: true
    },

   
});

const Char = mongoose.model('Char', CharSchema);

module.exports = Char;
