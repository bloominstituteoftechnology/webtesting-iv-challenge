const mongoose = require('mongoose');
const noteModel = require('../notes/noteModel');
const bcrypt = require('bcrypt');
// const friendModel = require('../friends/friendModel');

const ObjectId = mongoose.Schema.Types.ObjectId;
const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    notes: [{ type: ObjectId, ref: 'Note' }],
    friends: [{ type: ObjectId, ref: 'Friend' }],
    contactInfo: {
      email: {
        type: String,
      },
      phone: {
        type: Number,
      },
      github: {
        type: String,
      },
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      // check error or something
      return next(err);
    });
});

UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isValid) {
    if (err || isValid === false) {
      return callback(err);
    }
    callback(null, isValid);
  });
};

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
