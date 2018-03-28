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
      Band.find.yields(
        null,
        [
          { name: 'Linkin Park', genre: 'Garbage' },
          { name: 'Queers', genre: 'Pop Punk' },
        ]
      );
      Band.getAllBands((bands) => {
        expect(bands.length).to.equal(2);
        expect(bands[1].name).to.equal('Queers');
        Band.find.restore();
      });
    });
  });
  describe('getBandByName', () => {
    it('should return the matching band', () => {
      sinon.stub(Band, 'find');
      Band.find.yields(
        null,
        [
          { name: 'Linkin Park', genre: 'Garbage' },
          { name: 'Queers', genre: 'Pop Punk' },
        ]
      );
      const bandName = "Queers";
      Band.getBandByName((bandName, band) => {
        expect(band.name).to.equal('Queers');
        Band.find.restore();
      });
    });
  });
});