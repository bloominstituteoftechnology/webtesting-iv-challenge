const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
    author: {
        type: String,
        unique: true,
    },
});

// userSchema.pre('save', function() {
//     bcrypt.hash(this.password, 10).then(hash => { 
//         this.password = hash;
//         next(); 
//     }).catch(err => { 
//         console.log(err); 
//     })
// });

module.exports = mongoose.model('Book', bookSchema);
