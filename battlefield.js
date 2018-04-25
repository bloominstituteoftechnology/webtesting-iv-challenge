const mongoose = require('mongoose');
const { Schema } = mongoose;

const BattlefieldSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        toLowerCase: true
    },
    kills: {
        type: String,
        required:true,
        unique:false
    },
    deaths: {
        type: String,
        required:true,
        unique:false
    }
});

const Battlefield = mongoose.model('Battlefield', BattlefieldSchema);

module.exports = Battlefield;