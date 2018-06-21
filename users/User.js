const mongoose = require('mongoose')
bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
    },
    password: {
        type: String
    }
});

userSchema.pre('save', function (next) {
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = mongoose.model('User', userSchema)