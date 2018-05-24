const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    body: String,
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema, 'notes')