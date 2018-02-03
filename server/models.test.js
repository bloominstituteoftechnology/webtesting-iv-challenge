const chai= require('chai');
const expect = chai.expect;
const Soda = require('./SodaModel')

const mongoose = require('mongoose');
const sinon = require('sinon');

describe('testing models of app Sodas',() =>{
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test123');
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

    describe('#getSodaName', ()=>{
        const soda = new Soda({name:'Coke', rating: 9});
        console.log(soda.getSodaName());
        it('should be giving correct name', ()=>{
            expect(soda.getSodaName()).to.equal('Coke');
        })
        it('should be giving correct rating', ()=>{
            expect(soda.getSodaRating()).to.equal(9);
        })
    });

    describe('#getAllSodas()', () => {
        it('should return all the sodas', () => {
          sinon.stub(Soda, 'find');
          Soda.find.yields(null, [{ name: 'Coke', rating:9 }]);
          Soda.getAllSodas(returnObject => {
            expect(returnObject.length).to.equal(1);
            expect(returnObject[0].name).to.equal('Coke');
            expect(returnObject[0].rating).to.equal(9);
            Soda.find.restore();
          });
        });
    });
})