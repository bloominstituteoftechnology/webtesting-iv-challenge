const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const CatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: {
            String,
            enum: ["male", "female"]
        },
        required: true
    },
    humanSlave: [{
        type: ObjectId,
        ref: 'User'
    }]
})

CatSchema.pre('save', function(next) {
    if (this.gender === "male") {
        this.name = 'Sir ' + this.name
    } else if (this.gender === "female") {
        this.name = 'Madame ' + this.name

        next()
    }
})

module.exports = mongoose.model('Cat', CatSchema)