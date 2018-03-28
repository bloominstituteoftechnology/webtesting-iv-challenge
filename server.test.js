const express = require('express');
const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const Band = require('./models');

const server = require('./server');
chai.use(chaihttp);

describe('Server', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('Connection Error');
    });
    db.once('open', () => {
      console.log('Connected to MongoDB');
      done();
    });
  });
  after((done) => {
    const db = mongoose.connection;
    db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
  beforeEach(async () => {
    const band = new Band({
      name: 'La Armada',
      genre: 'Hardcore',
    });
    const band2 = new Band({
      name: 'Queers',
      genre: 'Pop Punk',
    });
    await band.save();
    await band2.save();
  });
  describe('[POST] /band', () => {
    it('should add a new band', (done) => {
      const newBand = {
        name: 'La Armada',
        genre: 'Hardcore',
      };
      chai
        .request(server)
        .post('/band')
        .send(newBand)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal('La Armada');
          expect(res.body.genre).to.equal('Hardcore');
          done();
        });
    });
  });
  describe('[GET] /bands', () => {
    it('should return all bands', (done) => {
      chai
        .request(server)
        .get('/bands')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal('La Armada');
          expect(res.body[1].genre).to.equal('Pop Punk');
          done();
        });
    });
  });
  describe('[PUT] /band/:id', () => {
    it('should update the band at :id', (done) => {
      const updatedBand = {
        name: 'Dinosaur Jr.',
        genre: 'Alternative',
      };
      chai
        .request(server)
        .get('/bands')
        .end((err, res) => {
          chai
            .request(server)
            .put('/band/' + res.body[0]._id)
            .send(updatedBand)
            .end((error, response) => {
              expect(response.body.name).to.equal('Dinosaur Jr.');
              done();
            });
        });
    });
  });
  describe('[DELETE] /band/:id', () => {
    it('should delete the band at :id', (done) => {
      chai
        .request(server)
        .get('/bands')
        .end((err, res) => {
          chai
            .request(server)
            .delete('/band/' + res.body[1]._id)
            .end((error, response) => {
              expect(response.body.name).to.equal('Queers');
              done();
            });
        });
    });
  });
});
