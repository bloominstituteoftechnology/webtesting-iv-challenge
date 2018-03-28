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

  describe('[POST] /team', () => {
    it('should add a new team', () => {
      const newTeam = {
        name: 'L.A Lakers',
        sport: 'Basketball',
      };
      chai.request(server)
        .post('/team')
        .send(newTeam)
        .end((err, res) => {
          // console.log(res.body);
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('L.A Lakers');
          expect(res.body.sport).to.equal('Basketball');
          expect(res.body).to.have.own.property('_id');
        });
    });
    it('should return Validation error', () => {
      const newTeam = {
        name: 'L.A Lakers',
      };
      chai.request(server)
        .post('/team')
        .send(newTeam)
        .end((err, res) => {
          // console.log(err);
          if (err) console.error(err);
          // expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('ValidationError');
          // expect(res.body.sport).to.equal('Basketball');
          // expect(res.body).to.have.own.property('_id');
        });
    });
  });

  // describe('[GET] /teams', () => {
  //   it('should return list of teams', () => {
  
  //     chai.request(server)
  //       .get('/teams')
  //       .end((err, res) => {
  //         if (err) console.error(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.length).to.equal(3);
  //         expect(res.body[0].name).to.equal('Oakland Raiders');
  //       });
  //   });
  // });

  // describe('[DELETE] /team', () => {
  //   it('should return the deleted team', () => {
  //     const newTeam = {
  //       name: 'Red Sox',
  //       sport: 'Baseball',
  //     };
  //     chai.request(server)
  //       .post('/team')
  //       .send(newTeam)
  //       .end((err, res) => {
  //         if (err) console.error(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.name).to.equal('L.A Lakers');
  //         expect(res.body.sport).to.equal('Basketball');
  //       });
  //     chai.request(server)
  //       .delete('/team')
  //       .send({name: 'Las Vegas Raiders', sport: 'Football'})
  //       .end((err, res) => {
  //         if (err) console.error(err);
  //         expect(res.status).to.equal(404);
  //         expect(res.body.name).to.equal('Las Vegas Raiders');
  //       });
  //   });
  // });
});