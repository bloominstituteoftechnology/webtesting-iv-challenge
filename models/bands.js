const mongoose = require("mongoose");
const { Schema } = mongoose;

const bandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    tourStatus: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Band", bandSchema);
