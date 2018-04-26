const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;
const Meta = require('./metas/Meta.js');
const Deck = require('./decks/Deck.js');
const Pilot = require('./pilots/Pilot.js');

describe('Models', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/metatest', err => {
      if (err) return console.log('Start your mongo DB!');
      console.log('Connected to TEST DB');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  describe('Meta Schema', () => {
    it('should have a name', done => {
      const meta = new Meta({ name: 'tester', location: 'New York, New York' });
      expect(meta.getName()).to.equal('tester');
      done();
    });
    it('should have a location', done => {
      const meta = new Meta({ name: 'tester', location: 'New York, New York' });
      expect(meta.getLocation()).to.equal('New York, New York');
      done();
    });
    it('if it has a password it should be hashed', done => {
      const meta = new Meta({
        name: 'tester',
        location: 'New York, New York',
        password: 'pw',
      });
      expect(meta.getPassword()).to.equal('New York, New York');
      done();
    });
  });
});
