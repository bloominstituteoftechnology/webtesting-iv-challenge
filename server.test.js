const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Team = require('./models');

describe('Server', () => {
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
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('L.A Lakers');
          expect(res.body.sport).to.equal('Basketball');
        });
    });
  });

  describe('[GET] /teams', () => {
    it('should return list of teams', () => {
  
      chai.request(server)
        .get('/teams')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          expect(res.body[0].name).to.equal('Oakland Raiders');
        });
    });
  });

  describe('[PUT] /team', () => {
    it('should return updated team', () => {
      chai.request(server)
        .put('/team')
        .send({name: 'Las Vegas Raiders', sport: 'Football'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Las Vegas Raiders');
        });
    });
  });
});