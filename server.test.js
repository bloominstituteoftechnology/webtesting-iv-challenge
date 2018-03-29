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

  describe('[POST] /teams', () => {
    it('should add a new team', done => {
      const newTeam = {
        name: 'Giants',
        sport: 'Football',
      };
      chai
        .request(server)
        .post('/teams')
        .send(newTeam)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Giants');
        });
      done();
    });
  });
  
    describe('[GET] /teams', () => {
    it('should return list of teams', (done) => {
      
      chai
        .request(server)
        .get('/teams')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(3);
          expect(res.body[0].name).to.equal('Giants');
        });
        done();
    });
  });

  describe('[PUT] /teams/:id', () => {
    it('should return updated team', done => {
      const updateTeam = { name: 'Giants', sport: 'Testing' };
      chai
        .request(server)
        .get('/teams')
        .end((err, res) => {
          chai
            .request(server)
            .put('/teams/' + res.body[0]._id)
            .send(updateTeam)
            .end((err, res) => {
              if (err) {
                console.error(err);
                done();
              }        
              expect(res.status).to.equal(200);
              expect(res.body[0].sport).to.equal('Testing');
            });
            done();
        });
    });
  });

  describe('[DELETE] /teams/:id', () => {
    it('should delete a team', (done) => {
      const deleteTeam = { name: 'Giants' };
      chai
        .request(server)
        .get('/teams')
        .end((err, res) => {
          chai
            .request(server)
            .delete('/teams/' + res.body[0]._id)
            .send(deleteTeam)
            .end((err, res) => {
              if (err) {
                console.error(err);
                done();
              }        
              expect(res.status).to.equal(200);
              expect(res.ok).to.be.true;
            });
            done();
        });
    });
  });
});
