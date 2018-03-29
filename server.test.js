const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Team = require('./models');

describe('Server', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('Something went wrong connecting');
    });
    db.once('open', () => {
      console.log('Connected');
      done();
    });
  });
  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('[POST] /team', () => {
    it('should add a new team', done => {
      const newTeam = {
        name: 'Arsenal',
        sport: 'Soccer',
      };
      chai
        .request(server)
        .post('/team')
        .send(newTeam)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Arsenal');
        });
      done();
    });
  });

  describe('[GET] /team', () => {
    it('should return a team name', done => {
      chai
        .request(server)
        .get('/team')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal('Arsenal');
        });
      done();
    });
  });

  describe('[PUT] /team', () => {
    it('should return updated team', done => {
      const updateTeam = { name: 'Stupid_Lions', sport: 'FootBall' };
      chai
        .request(server)
        .put('/team')
        .send(updateTeam)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal('Stupid_Lions');
        });
      done();
    });
  });

  //describe('[DELETE] /team', () => )
});