const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
  connectTo: function(database = 'sandbox', host = 'localhost') {
    return mongoose.connect(`mongodb://${host}/${database}`);
  },
  disconnect: function() {
    return mongoose.disconnect();
  },
};