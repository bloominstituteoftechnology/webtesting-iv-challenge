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

MarsupialSchema.methods.getName = () => {
    return this.name
};

MarsupialSchema.statics.getAllMarsupials = (cb) => {
    Mongoose.find({}, (err, marsupials) => {
        if (err) return cb(err);
        cb(marsupials)
    });
};

const Marsupial = mongoose.model('Marsupial', MarsupialSchema);
module.exports = Marsupial;