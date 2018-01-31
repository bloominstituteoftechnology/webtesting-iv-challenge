const mongoose = require('mongoose');


const SodaSchema  = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }
})

SodaSchema.methods.getSodaName = function() {
    return this.name;
  };

SodaSchema.methods.getSodaRating = function (){
    return this.rating;
}

SodaSchema.statics.getAllSodas = function(cb) {
    Soda.find({}, (err, sodas) => {
      if (err) return cb(err);
      cb(sodas);
    });
  };

const Soda = mongoose.model('Soda', SodaSchema);

module.exports = Soda;