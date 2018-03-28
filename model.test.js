const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Character = require('./character');

mongoose.connect('mongodb://localhost/characters');

// import things here

describe('Character', () => {
  describe('getCharacter()', () => {
    it(`should return the character`, () => {
      const character = new Character({
        name: 'character'
      });
    expect(character.getCharacter()).to.equal('character');
    });
  });

  describe('getAllCharacter()', () => {
    it(`should return a list of  characters`, () => {
      sinon.stub(character, 'find');
      character.find.yields(null, []);
      character.getAllcharacter(characters => {
        expect(characters.length).to.equal(2);
        character.find.restore();
      });
    });
  });
});
