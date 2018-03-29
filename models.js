const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShowSchema = new Schema({
   name: {
      required: true,
      type: String,
   },
   year: {
      type: Number,
      required: true,
   },
});

const Show = mongoose.model('Show', ShowSchema);

ShowSchema.methods.getShowName = () => {
   Show.find()
      .then()
      .catch();
};

module.exports = Show;
