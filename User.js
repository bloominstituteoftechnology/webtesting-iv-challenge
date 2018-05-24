const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String
    }
})

User.pre('save', function(next) {
    bcrypt.hash(this.password, 5)
    .then(hash => {
    this.password = hash;
    next();
    })
    .catch(err => res.send(err))
})
module.exports = mongoose.model('User', User);