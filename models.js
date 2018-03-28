const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema({
  manufacturer: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  }
});

CarSchema.methods.getCarName = function() {
  return this.name;
};

CarSchema.statics.getAllCars = (cb) => {
  Car.find({}, (err, cars) => {
    if (err) console.error(err);
    cb(cars);
  });
};

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
