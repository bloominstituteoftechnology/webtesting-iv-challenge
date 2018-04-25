const mongoose = require ('mongoose')
const { Schema } = mongoose;

const BandSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true,
        uppercase: true,
    },
    genre: {
        type: String,
        required: true,
    },
    recentAlbum: {
        type: String,
        required: true,
    }
});

const Band = mongoose.model('Band', BandSchema);

module.exports = Band;