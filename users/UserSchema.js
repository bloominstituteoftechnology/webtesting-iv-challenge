const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true, 
        required: true, 
        lowercase: true, 
    },
    password: {
        type: String, 
        required: true, 
        minlength: 4 // make this atleast 12 in production
    } 
}); 

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash; 

            return next(); 
    })
    .catch(error => {
        console.log(error); 
    })
}); 

userSchema.methods.validatePassword = function (passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password); 
}; 

module.exports = mongoose.model('User', userSchema); 