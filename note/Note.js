const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: String,
    password: {
        type: String,
        required: true
    }
})

noteSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            next(err)
        } 
        this.password = hash;

        next();
    })
})

module.exports = mongoose.model('Note', noteSchema, 'notes')