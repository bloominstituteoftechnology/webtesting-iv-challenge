const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    gender: {
        required: true,
        type: String,
    },
    age: {
        type: Number,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;