const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Team = require('./models');

describe('server', () => {
  let teamId = null;
  let testTeam = null;
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

  beforeEach(done => {
    const myTeam = new Team({ name: 'Mavericks', sport: 'Basketball' });
    myTeam
      .save()
      .then(team => {
        testTeam = team;
        teamId = team._id;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
  afterEach(done => {
    Team.remove({}, err => {
      if (err) console.error(err);
      done();
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
    it('should return list of teams', done => {
      chai
        .request(server)
        .get('/teams')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body[0].name).to.eql(testTeam.name);
          expect(res.body[0]._id).to.equal(teamId.toString());
          done();
        });
    });
  });

  describe('[PUT] /team', () => {
    it('should return updated team', done => {
      const updateTeam = { id: teamId, name: 'Bills', sport: 'Testing' };
      chai
        .request(server)
        .get('/team')
        .send(updateTeam)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.body.name).to.equal(updateTeam.name);
          expect(res.body.sport).to.equal(updateTeam.sport);
        });
      done();
    });

    it('should handle error if bad id sent', done => {
      const updateTeam = { id: 'blajdfd', name: 'Giants', sport: 'Testing' };

      chai
        .request(server)
        .put('/team')
        .send(updateTeam)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('Team not found by that Id');
          }
          done();
        });
    });
  });

  describe('[DELETE] /teams/:id', () => {
    it('should delete a team', done => {
      const deleteTeam = new Team({ name: 'Giants' });
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
