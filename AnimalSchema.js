const mongoose = require('mongoose');

const Animal = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Animal', Animal);