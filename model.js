const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClimbSchema = new Schema({
    climbingLocation: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    climbingType: {
        type: String,
        required: true,
    }
});

ClimbSchema.methods.getClimbingType = function() {
    return this.climbingType;
};

ClimbSchema.statics.getAllClimbingLocations = function(cb) {
    Climbs.find({}, (err, climbs) => {
        if(err) return cb(err);
        cb(climbs);
    });
};

const Climbs = mongoose.model('Climbs', ClimbSchema);

module.exports = Climbs;