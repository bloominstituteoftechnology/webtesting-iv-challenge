const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Show = require('./models');

describe('Shows', () => {
   before(done => {
      mongoose.connect('mongodb://localhost/testShow');
      const db = mongoose.connection;
      db.on('error', () => console.error.bind(console, 'connection error'));
      db.once('open', () => {
         console.log('we are connected');
         done();
      });
   });

   after(done => {
      mongoose.connection.db.dropDatabase(() => {
         mongoose.connection.close(done);
      });
   });
   
   describe('getShowName', () => {
      it('should return the expected show name', () => {
         const show = new Show({
            name: 'Black Mirror',
            year: 2015
         });
         expect(show.getShowName()).to.equal('Black Mirror');
      });
   });
   
   describe('getAllShows', () => {
      it('should return all the shows', () => {
         sinon.stub(Show, 'find');
         Show.find.yields(null, [
            { name: 'Black Mirror', year: 2015 },
            { name: 'Brooklyn Nine-Nine', year: 2013 }
         ]);
         Show.getAllShows(shows => {
            expect(shows.length).to.equal(2);
            expect(shows[1].name).to.equal('Brooklyn Nine-Nine');
            Show.find.restore();
         });
      });
   });
})
