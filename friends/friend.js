const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: String
    },
    profession: {
        type: String
    },
    age: {
        type: Number
    },
    comments: [{
        body: String, 
        date: Date
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});

friendSchema.statics.search = function search(name, cb){
    return this.where('name', new RegExp(name, 'i')).exec(cb);
}

module.exports = mongoose.model('Friend', friendSchema)

