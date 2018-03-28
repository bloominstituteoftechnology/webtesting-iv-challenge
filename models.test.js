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
});