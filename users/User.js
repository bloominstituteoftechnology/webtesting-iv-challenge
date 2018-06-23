const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', function(next) {
    bcrypt 
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
        .catch( err => {
            console.log(err)
        })
})

module.exports = mongoose.model('User', userSchema)