const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            next(err)
        }
        this.password = hash;

        next();
    });
});

module.exports = mongoose.model('User', userSchema, 'users');
