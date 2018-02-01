const mongoose = require('mongoose');
const Soda = require('./SodaModel')
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);

describe('Soda Routes', () => {
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

  describe(`[POST] /api/sodas/create`, () => {
    it('should add a new Soda', done => {
      const soda = {
        name: 'Coke',
        rating: 9
      };
      chai
        .request(server)
        .post('/api/sodas/create')
        .send(soda)
        .end((err, res) => { 
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Coke');
            expect(res.body.rating).to.equal(9);
            done();
        });
    });
  });

  describe(`[GET] /api/sodas`, () => {
    it('should get all Soda names', done => {
      chai
        .request(server)
        .get('/api/sodas')
        .end(function(err, res) {
          if (err) {
            console.error(err);
            done();
          } 
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

