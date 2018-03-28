const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarsupialSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    latinName: {
        type: String, 
        required: true
    },
    region: {
        type: String, 
        required: true
    }
});

MarsupialSchema.methods.getName = function () {
    return this.name;
};

MarsupialSchema.methods.getLatinName = function () {
    return this.latinName;
};

MarsupialSchema.methods.getRegion = function () {
    return this.region;
};

MarsupialSchema.statics.getAllMarsupials =  function(cb) {
    Marsupial.find({}, (err, marsupials) => {
        if (err) return cb(err);
        cb(marsupials)
    });
};

const Marsupial = mongoose.model('Marsupial', MarsupialSchema);
module.exports = Marsupial;