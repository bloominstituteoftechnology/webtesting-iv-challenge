const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const Band = require('./band');

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
    mongoose.connecttion.close();
    done();
  });

  describe('getBand', () => {
    it('should return the name of the band', done => {
      const band = new Band({ name: 'Radiohead', genre: 'Alternative Rock', album: 'In Rainbows' });
      expect(band.getName()).to.equal('Radiohead');
      done();
    });
  });

  // broken bellow
  describe('getAllBands', () => {
    it('should return all the bands', done => {
      sinon.stub(Band, 'find');
      Band.find.yields(null, [
        { name: 'Radiohead', genre: 'Alternative Rock', album: 'In Rainbows' },
      ]);
      Band.getAllBands(bands => {
        console.log(bands);
      });
    });
  });
});
