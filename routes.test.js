const mongoose = require('mongoose');
const Animals = require('./Animals');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;

chai.use(chaiHTTP);

mongoose.connect('mongodb://localhost/test');

describe('/animals', () => {
  before((done) => {
    Animals.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
  describe('[POST] /animals', () => {
    it('should add an animal to the database', (done) => {
      const animal = {
        name: 'Penguin',
        continent: 'Antarctica'
      };
      chai.request(server)
        .post('/animals')
        .send(animal)
        .end((err, res) => {
          if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Penguin');
        expect(res.body.continent).to.equal('Antarctica');
        done();
      });
    });
  });
  describe('[GET] /animals', () => {
    it('should get all of the animals', (done) => {
      chai.request(server)
        .get('/animals')
        .end((err, res) => {
          if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body.length).to.equal(1);
        done();
      });
    });
  });
  describe('[PUT] /animals/:name', () => {
    it('should update a single animal', (done) => {
      const animal = {
        continent: 'Africa'
      };
      chai.request(server)
        .put('/animals/Penguin')
        .send(animal)
        .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Penguin');
        expect(res.body.continent).to.equal('Africa');
        done();
      });
    });
  });
});