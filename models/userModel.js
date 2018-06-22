const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.pre('save', function(next) {
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        }).catch(err => {
            next(err)
        });
});

userSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password)
}

module.exports = mongoose.model('User', userSchema)