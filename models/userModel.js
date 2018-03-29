const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.getFirstName = function() {
    return this.firstName;
};

UserSchema.statics.getAllUsers = function(cb) {
    User.find({}, (err, users) => {
        if (err) return cb(err);
        cb(users);
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
