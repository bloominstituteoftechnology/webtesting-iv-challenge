const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', { useMongoClient : true })

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true
  },
  password: {
      required: true,
      type: String,
  }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;