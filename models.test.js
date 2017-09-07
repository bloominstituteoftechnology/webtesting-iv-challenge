const mongoose = require('mongoose')
mongoose.connect('mongoose://localhost/test')
const Pokemon = require('./pokemon')

const chai = require('chai')
const { expect} = chai
const sinon = require('sinon')

describe('Pokemon', () => {
  describe('#getName()', () => {
    const pokemon = new Pokemon({
      name: 'Pikachu'
    })
    it('should be a function', () => {
      expect(typeof pokemon.getName).to.equal('function')
    })
    it('should return the name of the Pokemon', () => {
      expect(pokemon.getName()).to.equal('Pikachu')
    })
    it('should return a string', () => {
      expect(typeof pokemon.getName()).to.equal('string')
    })
  })
  describe('#getAllPokemon', () => {
    it('should be a function', () => {
      expect(typeof Pokemon.getAllPokemon).to.equal('function')
    })
    it('should return all Pokemon', () => {
      sinon.stub(Pokemon, 'find')
      Pokemon.find.yields(null, [{ name: 'Pikachu' }])
      Pokemon.getAllPokemon((pokemon) => {
        expect(pokemon.length).to.equal(1);
        expect(pokemon[0].name).to.equal('Pikachu')
        Pokemon.find.restore()
      })
    })
  })
})
