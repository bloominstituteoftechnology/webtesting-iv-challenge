const mongoose = require('mongoose');

const WoofSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        lowercase: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Woof', WoofSchema);