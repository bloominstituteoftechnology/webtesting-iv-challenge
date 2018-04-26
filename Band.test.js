const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const Band = require('./Band.js');
const sinon = require('sinon');

const expect = chai.expect;

describe('Band', () => {
  let bandId;
  before(done => {
    mongoose.connect('mongodb://localhost/testMini', {}, err => {
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
    it('should return the name and genre of the band', done => {
      const band = new Band({ name: 'Kenny G', genre: 'Jazz' });
      expect(band.getName()).to.equal('Kenny G');
      expect(band.getGenre()).to.equal('Jazz');
      done();
    });
  });
});
