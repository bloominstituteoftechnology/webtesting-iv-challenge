const mongoose = require('mongoose');
const { Schema } = mongoose;

const DbzCharsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    race: {
        type: String,
        required: true
    }
});

const Char = mongoose.model('Char', DbzCharsSchema);