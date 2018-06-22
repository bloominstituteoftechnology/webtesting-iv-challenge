const mongoose = require('mongoose');

// define schema
const schema = new mongoose.Schema({
    title: { type: String, required: true },
})

// export model
module.exports = mongoose.model('Films', schema)
