const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
    },
 password:String,
})

module.exports = mongoose.model('User', User)