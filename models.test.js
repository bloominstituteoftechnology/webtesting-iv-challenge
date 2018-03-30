const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Band = require('./models');

describe('Bands', () => {
  describe('getBandName', () => {
    it('should return the expected band name', () => {
      const band = new Band({
        name: 'Descendents',
        genre: 'Pop Punk',
      });
      expect(band.getBandName()).to.equal('Descendents');
    });
  });
  describe('getAllBands', () => {
    it('should return all the bands', () => {
      sinon.stub(Band, 'find');
      Band.find.yields(null, [
        { name: 'Linkin Park', genre: 'Garbage' },
        { name: 'The Vandals', genre: 'Pop Punk' },
      ]);
      Band.getAllBands((bands) => {
        expect(bands.length).to.equal(2);
        expect(bands[1].name).to.equal('The Vandals');
        Band.find.restore();
      });
    });
  });
  describe('getBandByName', () => {
    it('should return band with name provided', () => {
      sinon.stub(Band, 'findOne');
      Band.findOne.yields(null, {
        name: 'The Vandals',
        genre: 'Pop Punk',
      });
      Band.getBandByName('The Vandals', (band) => {
        expect(band.name).to.equal('The Vandals');
        Band.findOne.restore();
      });
    });
  });
  describe('getBandGenre', () => {
    it('should return the band genre', () => {
      const band = new Band({
        name: 'Descendents',
        genre: 'Pop Punk',
      });
      expect(band.getBandGenre()).to.equal('Pop Punk');
    });
  });
  describe('Band', () => {
    it('should have name,genre,_id properties', () => {
      const band = new Band({
        name: 'Against Me!',
        genre: 'Anarcho-Folk Punk',
      });
      expect(band.getBandName()).to.equal('Against Me!');
      expect(band.getBandGenre()).to.equal('Anarcho-Folk Punk');
      expect(band.name).to.exist;
      expect(band.genre).to.exist;
      expect(band._id).to.exist;
    });
  });
});
