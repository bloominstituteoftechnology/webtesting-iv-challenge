const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Animal = require('../animalmodel');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Animal', () => {
  it('should name, type and region', () => {
    const animal = new Animal({
      name: 'Lion',
      type: 'carnivore',
      region: 'India',
    });
    expect(animal.name).to.equal('Lion');
    expect(animal.type).to.equal('carnivore');
    expect(animal.region).to.equal("India");
  });
  describe('#getRegion()', () => {
    it('Should return the region', () => {
      const animal = new Animal({
        name: 'Lion',
        type: 'carnivore',
        region: 'India',
      });
      expect(animal.getRegion()).to.equal('India');
    });
    it ('should return a string', () => {
      const animal = new Animal({
        name: 'Lion',
        type: 'carnivore',
        region: 'India',
      });
      expect(typeof animal.getRegion()).to.equal('string');
    })
  })
});