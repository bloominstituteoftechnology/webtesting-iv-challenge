const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    username: String,

    password: String
})


userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 5).then(hash => {
        this.password = hash;

        next();
    }).catch(err => {
        next(err);
    })
})


module.exports = mongoose.model("User", userSchema)