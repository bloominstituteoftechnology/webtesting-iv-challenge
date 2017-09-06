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
    region: [{
        type: String,
        required: true
    }]
});

const Animal = mongoose.model('Animal', AnimalSchema);

AnimalSchema.methods.getRegion = function() {
    return this.region;
}

AnimalSchema.statics.getAllAnimals = function(){
    // Animal.find({}, (err, animal) => {
    //     if (err) return (err);
    //     return animal;
    // });
};


module.export = Animal;
