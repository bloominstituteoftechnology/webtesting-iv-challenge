const mongoose = require('mongoose');
const Animals = require('./Animals');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect; //IF ERRORS CHECK ME!!!

mongoose.connect('mongodb://localhost/test');

//CHECK RESPONSE STRING
//CHECK FOR SPECIFIC ANIMIAL NAME

describe('Animals', () => {
  describe('#getName()', () => {
    it('should return a string', () => {
      const animal = new Animals({
        name: 'Giraffe',
        continent: 'Africa'
      });
      expect(typeof animal.getName()).to.equal('string');
    });
    it('should return the name of the animal', () => {
      const animal = new Animals({
        name: 'Giraffe',
        continent: 'Africa'
      });
      expect(animal.getName()).to.equal('Giraffe');
    });
  });
  describe('#getAllAnimals', () => {
    it('should return all animals', () => {
      sinon.stub(Animals, 'find');
      Animals.find.yields(null, [{ name: 'Giraffe', continent: 'Africa' }]);
      Animals.getAllAnimals((animals) => {
        console.log(animals);
        expect(animals.length).to.equal(1);
        expect(animals[0].name).to.equal('Giraffe');
        expect(animals[0].continent).to.equal('Africa');
        Animals.find.restore();
      });
    });
  });
});



