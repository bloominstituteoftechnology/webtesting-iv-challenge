const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        unique: true,
        required: true
    }

});

module.exports = mongoose.model('Product', productSchema);