const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('VideoGame', GameSchema);