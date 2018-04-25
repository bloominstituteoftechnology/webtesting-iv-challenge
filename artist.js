const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({ 
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;