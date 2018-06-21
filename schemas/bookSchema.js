const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    Title: {
        type: String,
        unique: true,
        required: true
    }

});

module.exports = mongoose.model('Book', bookSchema);