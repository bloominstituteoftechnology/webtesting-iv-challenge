const mongoose = require('mongoose');
const { Schema } = mongoose;

const ModSchema = new Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    creator: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    uniqueLevels: {
        type: Boolean,
        required: true
    },
    difficulty: {
        type: Number,
        min: 0,
        max: 10
    },
    reviews: [{
        userRating: {
            type: Number,
            min: 0,
            max: 5
        },
        text: {
            type: String,
        }
    }]
})

ModSchema.methods.getAvgRating = function() {
    if (this.reviews.length === 0) {
        return 0;
    }
    const divisor = this.reviews.length
    const totalReviewScore = this.reviews.reduce((memo, review) => {
        return memo + review.userRating
    }, 0)
    return totalReviewScore / divisor;
}

const Mod = mongoose.model('Mod', ModSchema)

module.exports = Mod;