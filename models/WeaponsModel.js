const mongoose = require('mongoose');
const { Schema } = mongoose;

const WeaponSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  }
});

WeaponSchema.methods.getWeaponName = function() {
  return this.name;
};

WeaponSchema.methods.getWeaponDesc = function() {
  return this.description;
};

WeaponSchema.statics.getAllWeapons = () => {
  Weapon.find({}, (err, weapons) => {
    if (err) console.error(err);
    else return weapons;
  });
};

const Weapon = mongoose.model('Weapon', WeaponSchema);
module.exports = Weapon;