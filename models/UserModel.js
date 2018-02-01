const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    aboutme: {
        type: String,
        default: '',
    }
});

UserSchema.statics.getUsers = (cb) => {
    User.find({}, (err, result) => {
        if (err) return cb(err);
        cb(result);
    });
};

UserSchema.statics.createUser = (cb, user) => {
    User.save(user, (err, result) => {
        if (err) return cb(err);
        cb(result);
    });
};

UserSchema.statics.getOneUser = (cb, user) => {
    const { email } = user;
    User.findOne({ email }, (err, result) => {
        if (err) return cb(err);
        cb(result);
    });
};

UserSchema.methods.updateUser = (cb, id) => {

}

UserSchema.methods.getUserPw = (cb, id) => {
    User.findById(id, (err, result) => {
        if (err) return cb(err);
        cb(result);
    });
};




module.exports = mongoose.model('User', UserSchema);