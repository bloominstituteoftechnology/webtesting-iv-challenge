const Band = require('./model');
const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

describe('Band', () => {
  describe('getBand', () => {
    it('should return the name of the band', done => {
      const band = new Band({
        bandName: 'Volumes',
        bandGenre: 'hardcore'
      });
      expect(band.getName()).to.equal('Volumes');
      done();
    });
  });
  describe('getBand', () => {
    it('should return the genre of the band', done => {
      const band = new Band({
        bandName: 'Volumes',
        bandGenre: 'hardcore'
      });
      expect(band.getGenre()).to.equal('hardcore');
      done();
    });
  });
  //   describe('getAllBands', () => {
  //     it('should return all the bands', done => {
  //       sinon.stub(Band, 'find');
  //       Band.find.yields(null, [
  //         { bandName: 'A Day To Remember', bandGenre: 'post-hardcore' }
  //       ]);
  //       Band.getAllBands(bands => {
  //         expect(bands.length).to.equal('1');
  //         done();
  //       });
  //     });
  //   });
});
