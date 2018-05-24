const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
    },
 password:String,
})

module.export = mongoose.model('User', User)