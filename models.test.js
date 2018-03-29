const mongoose = require('mongoose');
const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');

const Band = require('./models');

describe('Bands', () => {
    describe('getBandName', () => {
        it('should return the expected band name', () => {
            const band = new Band({
                name: 'VVS',
                genre: 'VVS-rock',
            });
            expect(band.getBandName()).to.equal('VVS');
        });
    });

    describe('getAllBands', () => {
        it('should return all the bands', () => {
            sinon.stub(Band, 'find'); //stub function gets access to Band constructor and stub's find gets all bands from BAnd.
            Band.find.yields(null, [
                {name: 'VVS1', genre: 'Alt-Rock'},
                {name: 'Something', genre: 'Emo Rock'}
            ]);
        });
    });
});

