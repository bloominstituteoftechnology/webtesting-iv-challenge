const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const {expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp); //testing - making foul request.

const Band = require('./models');

describe('Server', () => {
describe('[POST] /band', () => { 
    it('should add a new band', () => {
        const newBand = {
            name: 'Radiohead',
            genre: 'Alt',
        };
        chai.request(server)
        .post('/band')
        .send(newBand)
        .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Radiohead');
        });
    });
  });

  describe('[GET] /bands', () => {
    it('should return `Hello World`', () => {
        chai.request(server)
        .get('/bands')
        .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.equal('Hello World');
        });
    });
  });
});