const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
});

module.exports = mongoose.model('User', userSchema);