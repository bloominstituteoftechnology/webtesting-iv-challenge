const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShowSchema = new Schema({
   name: {
      required: true,
      type: String,
   },
   year: {
      required: true,
      type: Number,
   },
});

ShowSchema.methods.getShowName = function() {
   if (this.name) return this.name
   return 'not a valid name';
}

ShowSchema.statics.getAllShows = (cb) => {
   Show.find({}, (err, shows) => {
      if (err) return cb(err);
      cb(shows);
   });
};

const Show = mongoose.model('Show', ShowSchema);

module.exports = Show;
