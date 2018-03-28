const express = require('express');
const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

describe('Server', () => {
  describe('[POST] /band', () => {
    it('should add a new band', () => {
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
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('La Armada');
          expect(res.body.genre).to.equal('Hardcore');
        });
    });
  });
  describe('[GET] /bands', () => {
    it('should return all bands', () => {
      const newBands = [
        {
          name: 'La Armada',
          genre: 'Hardcore',
        },
        {
          name: 'Queers',
          genre: 'Pop Punk',
        },
      ];
      chai
        .request(server)
        .get('/bands')
        .send(newBands)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal('La Armada');
          expect(res.body[1].genre).to.equal('Pop Punk');
        });
    });
  });
  describe('[PUT] /band', () => {
    it('should update band', () => {
      const newBands = [
        {
          name: 'La Armada',
          genre: 'Hardcore',
        },
        {
          name: 'Queers',
          genre: 'Pop Punk',
        },
      ];
      const updatedBand = {
        name: 'Dinosaur Jr.',
        genre: 'Alternative Rock',
      };
      chai
        .request(server)
        .get('/bands')
        .send(newBands)
        .end((err, res) => {
          chai
            .request(server)
            .put('/band/' + newBands[0].name)
            .send(updatedBand)
            .end((error, response) => {
              if (error) console.error(error);
              expect(response.status).to.equal(200);
              expect(response.body[0].name).to.equal('Dinosaur Jr.');
              expect(response.body[1].genre).to.equal('Pop Punk');
            });
        });
    });
  });
});
