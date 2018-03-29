const mongoose = require('mongoose');

const { Schema } = mongoose;

const ToppingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

ToppingSchema.methods.addATopping = function() {
  return this.name;
};

ToppingSchema.statics.getAllTheToppings = (cb) => {
  Topping.find({}, (err, toppings) => {
    if (err) console.error(err);
    cb(toppings);
  })
}

const Topping = mongoose.model('Topping', ToppingSchema);

module.exports = Topping;