const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

AnimalSchema.methods.getRegion = function() {
    return this.region;
};

AnimalSchema.statics.getAllAnimals = function(cb){
    Animal.find({}, (err, animal) => {
        if (err) return cb(err);
        cb(animal);
    });
};

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;
