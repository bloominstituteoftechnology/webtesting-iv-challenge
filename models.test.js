const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const Battlefield = require('./battlefield');
const expect = chai.expect;

describe('Battlefield', () => {
  let battleId;
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

  describe('getName', () => {
    it('should return the name of the battlefield player', done => {
      const battlefield = new Battlefield({ name: 'madcat', kills: '38000', deaths: '20000' });
      expect(battlefield.getName()).to.equal('madcat');
      done();
    });
  });

  describe('getAllData', () => {
    it('should return all the data', () => {
      sinon.stub(Battlefield, 'find');
      Battlefield.find.yields(null, [{ name: 'MadCat', kills: '38000', deaths: '20000' }]);
      Battlefield.getAllData(battlefields => {
        Battlefield.find.restore();

        expect(battlefields).to.be.an('array');
      });
    });
  });
});
