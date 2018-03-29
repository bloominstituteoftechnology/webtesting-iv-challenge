
const mongoose = require('mongoose');
const { Schema } = mongoose;


const BandSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    genre: {
        required: true,
        type: String,
    }
});

BandSchema.methods.getBandName = () => {
    return this.name;
};

module.exports = mongoose.model('Band', BandSchema);