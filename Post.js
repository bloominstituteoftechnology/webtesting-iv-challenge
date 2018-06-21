const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    body: {
        type: String,
        require: true
    }
})

module.exports =  mongoose.model('Post', postSchema);


