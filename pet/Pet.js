const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    species: String,
    password: {
        type: String,
        required: true,
    },
});

petSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            next(err)
        } 
        this.password = hash;

        next();
    });
});

module.exports = mongoose.model('Pet', petSchema, 'pets')