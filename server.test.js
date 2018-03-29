const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Team = require('./models');

describe('Server', () => {

  before((done) => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error');
    });
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  beforeEach((done) => {
    new Team({
      name: 'Sacramento Kings',
      sport: 'Basketball'
    }).save((err, team) => {
      if (err) {
        console.log(err);
        return done();
      }
      done();
    });
  });

  // afterEach((done) => {
  //   Team.remove({}, (err) => {
  //     if (err) console.log(err);
  //     done();
  //   });
  // });

  describe('[POST] /api/team', () => {
    it('should add a new team', (done) => {
      const newTeam = {
        name: 'L.A Lakers',
        sport: 'Basketball',
      };
      chai.request(server)
        .post('/api/team')
        .send(newTeam)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('L.A Lakers');
          expect(res.body.sport).to.equal('Basketball');
          expect(res.body).to.have.own.property('_id');
        });
        done();
    });

    it('should return Validation error', (done) => {
      const newTeam = {
        name: 'L.A Lakers',
      };
      chai.request(server)
        .post('/api/team')
        .send(newTeam)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.name).to.equal('ValidationError');
        });
        done();
    });
  });

  describe('[GET] /api/teams', () => {
    it('should return list of teams', (done) => {
      console.log('testing - get request method');
      chai.request(server)
        .get('/api/teams')
        .end((err, res) => {
          // console.log('get from db', res.body);
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(4);
          expect(res.body[0].name).to.equal('Sacramento Kings');
        });
        done();
    });
  });


  describe('[PUT] /api/team', () => {
    it('should update a team', (done) => {
      const updatedTeam = {
        name: 'L.A Lakers',
        sport: 'Baseball',
      };
      chai.request(server)
        .put('/api/team')
        .send(updatedTeam)
        .end((err, res) => {
          if (err) console.error(err);
          // console.log('get from db', res.body);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('L.A Lakers');
          expect(res.body.sport).to.equal('Baseball');
          // expect(res.body).to.have.own.property('_id');
        });
        done();
    });
  });

  describe('[DELETE] /api/team', () => {
    it('should return the deleted team', () => {
      chai.request(server)
        .delete('/api/team')
        .send({name: 'L.A Lakers', sport: 'Baseball'})
        .end((err, res) => {
          console.log('deleted team', res.body);
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('L.A Lakers');
        });
    });
  });
});