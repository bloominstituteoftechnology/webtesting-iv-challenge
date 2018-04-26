const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const Band = require('../Model');

const expect = chai.expect;
describe('Band', () => {
  let bandId;
  before(done => {
    mongoose.connect('mongodb://localhost/test', {}, err => {
      if (err) return console.log(err);
      console.log('TEST DB Connection Achieved');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  describe('getBand', () => {
    it('should return the name of the band', done => {
      const band = new Band({ name: 'Radiohead', genre: 'rock' });
      expect(band.getName()).to.equal('Radiohead');
      done();
    });
  });
});
