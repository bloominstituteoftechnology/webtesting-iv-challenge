const mongoose = require('mongoose');

module.exports = {
    conntectTo: function (database = 'budgetTracker', host = 'localhost') {

        return mongoose.connect(`mongodb://${host}/${database}`);

    },
};