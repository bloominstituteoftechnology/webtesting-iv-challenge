const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    Title: {
        type: String,
        unique: true,
        required: true
    },
    password: String,

});
bookSchema.pre('save', function (next) {
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        })
        .catch(err => {
            next(err);
        });
});

module.exports = mongoose.model('books', Books);