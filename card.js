const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    manaCost: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }]
})

CardSchema.methods.getName = function() {
    return this.name;
}
CardSchema.methods.getManaCost = function() {
    return this.manaCost;
}
CardSchema.methods.getTags = function() {
    return this.tags;
}


CardSchema.statics.getAllCards = function(cb) {
    Card.find({}, (err, cards) => {
        if (err) return cb(err);
        cb(cards);
    });
}
const Card = mongoose.model('Card', CardSchema);

module.exports = Card;