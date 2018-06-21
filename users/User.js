const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
    },


})


userSchema.pre('save', function() {
    bcrypt.hash(this.password, 10).then(hash => {
       
    })
})