const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const Band = require('../bands');

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
    const band = new Band({
      name: 'Led Zeppelin',
      genre: 'Classic Rock',
      numberOfMembers: 4,
      yearFounded: 1968
    });
    it('should return the properties of the band', done => {
      expect(band.getName()).to.equal('Led Zeppelin');
      expect(band.getGenre()).to.equal('Classic Rock');
      expect(band.getMembers()).to.equal(4);
      expect(band.getYear()).to.equal(1968);
      done();
    });
    it('should return a string', done => {
      expect(typeof band.getName()).to.equal('string');
      done();
    });
    it('should return a number', done => {
      expect(typeof band.getYear()).to.equal('number');
      done();
    });
  });

  // describe('getAllBands', () => {
  //   it('should return all bands', () => {
  //     sinon.stub(Band, 'find');
  //     Band.find.yields(null, [
  //       {
  //         name: 'Led Zeppelin',
  //         genre: 'Classic Rock',
  //         numberOfMembers: 4,
  //         yearFounded: 1968
  //       }
  //     ]);
  //     Band.getAllBands(bands => {
  //       expect(bands.length).to.equal(1);
  //       done();
  //     });
  //   });
  // });
});
