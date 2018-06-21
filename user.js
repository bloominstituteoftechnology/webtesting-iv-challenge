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

userSchema.pre('save', function(){
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        })
})