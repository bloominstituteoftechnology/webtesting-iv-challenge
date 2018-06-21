const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true 
    }
})

userSchema.pre('save', function(next) {
    bcrypt
        .hash(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;

            next();
        })
        .catch(err => {
            console.log(err);
        });
});



module.exports = mongoose.model('User', userSchema);