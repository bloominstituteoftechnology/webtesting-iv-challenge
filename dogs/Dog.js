const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const DogSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    }
});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;