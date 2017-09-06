const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});
mongoose.Promise = global.Promise;

const Team = require('./TeamModel');
const server = require('./server')

const chai = require('chai');
const assert = chai.assert;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
describe('App Routes', () => {
  describe('/allteams', () => {
    beforeEach((done) => {
      Team.remove({}, (err) => {
        if (err) return console.log(err);
        done();
      })
    });
    describe('[GET] /allteam', () => {
      it('should return all the teams in the database', (done) => {
        chai.request(server)
          .get('/api/allteams')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body)
            assert.lengthOf(res.body, 0);
            done();
          });
      });
    });
  });
  describe('/addteam', () => {
    beforeEach((done) => {
      Team.remove({}, (err) => {
        if (err) return console.log(err);
        done()
      });
    });
    describe('[POST] /addteam', () => {
      it('it should add a team to the database', (done) => {
        const team = { name: 'NY Knicks'}
        chai.request(server)
          .post('/api/addteam')
          .send(team)
          .end((err, res) => {
            if (err) return console.log(err);
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.equal(res.body.name, 'NY Knicks')
            done();
          })
      });
    });
  });

  describe('/editteam', () => {
    beforeEach((done) => {
      Team.remove({}, (err) => {
        if (err) return console.log(err);
        done();
      });
    });
    it('should update the team name', (done) => {
      const team = { name: 'GS Warriors'}
      const newTeam = new Team(team);
      chai.request(server)
        .post('/api/addteam')
        .send(newTeam)
        .end((err, res) => {
          if (err) console.log(err);
        });
      chai.request(server)
        .put('/api/editteam')
        .send({ name: 'LA Lakers', oldName: 'GS Warriors' })
        .end((err, res) => {
          if (err) return console.log(err);
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.equal(res.body.name, 'LA Lakers')
          done();
        });
    });
  });

  describe('/deleteteam', () => {
    beforeEach((done) => {
      Team.remove({}, (err) => {
        if (err) return console.log(err);
        done();
      });
    });
    it('should delete team from the database', (done) => {
      chai.request(server)
        .post('/api/addteam')
        .send({name: 'Houston Rockets'})
        .end((err, res) => {
          if (err) console.log(err);
        });
      chai.request(server)
        .delete('/api/removeteam')
        .send({ name: 'Houston Rockets'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.equal(res.body.name, 'Houston Rockets')
          done();
        })
    });
  });
});
