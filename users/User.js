const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    bcrypt
        .hash(this.password, 12)
        .then(hash => {
            this.password = hash;
        next();
        });

        .catch(error => {
            next(error);
        });
});

module.exports = mongoose.model('User', userSchema);