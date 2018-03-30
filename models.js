const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
    }
});

UserSchema.methods.getUserName = function() {
    return this.name;
};

UserSchema.statics.getAllUsers = (cb) => {
    User.find({}, (err, users) => {
        if (err) console.error(err);
        cb(users);
    });
};

const User = mongoose.model('Band', UserSchema)

module.exports = User;