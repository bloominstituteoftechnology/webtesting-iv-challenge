const mongoose = require('mongoose');
const Animals = require('./Animals');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect; //IF ERRORS CHECK ME!!!

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
});

mongoose.connect('mongodb://localhost/test');

