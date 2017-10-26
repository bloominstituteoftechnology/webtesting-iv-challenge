const mongoose = require('mongoose');
const { Schema } = mongoose;

const PokemonSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
})

PokemonSchema.methods.getName = function() {
  return this.name;
}

PokemonSchema.statics.getAllPokemon = function(cb) {
  Pokemon.find({}, (err, pokemon) => {
    if (err) return cb(err);
    cb(pokemon);
  })
}

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

module.exports = Pokemon
