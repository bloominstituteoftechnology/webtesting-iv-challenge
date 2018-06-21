const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
    race: {
        type: String,
        unique: true
    },
    agency: {
        type: String,
        unique: true
    },
});

raceSchema.pre('save', function() {

  });


module.exports = mongoose.model('Race', raceSchema);