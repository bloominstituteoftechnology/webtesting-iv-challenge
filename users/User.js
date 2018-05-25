const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 7, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        return next();
    })
})

module.exports = mongoose.model('User', UserSchema);