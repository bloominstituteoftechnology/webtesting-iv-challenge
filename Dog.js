const mongoose = require('mongoose');
const { Schema } = mongoose;

const DogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    }
})

const Dog = mongoose.model('Dog', DogSchema);


module.exports = Dog;