const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const Band = require('./Band.js');

const server = require('./server.js');
const expect = chai.expect;

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  before(done => {
    mongoose.connect('mongodb://localhost/testMini', {}, err => {
      if (err) return console.log(err);
      console.log('TEST DB Connection Achieved');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });
  beforeEach(done => {
    const newBand = new Band({
      name: 'John Coltrane',
      genre: 'Jazz',
    });
    newBand.save((err, savedBand) => {
      if (err) {
        console.log(err);
        done();
      }
      bandId = savedBand._id.toString();
      done();
    });
  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /bands`, () => {
    it('should get a list of all the bands in db', done => {
      chai
        .request(server)
        .get('/bands')
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          const { _id, name, genre } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(bandId);
          expect(name).to.equal('John Coltrane');
          expect(genre).to.equal('Jazz');
          done();
        });
    });
  });

  describe(`[POST] /bands`, () => {
    it('should post a new band to the db', done => {
      chai
        .request(server)
        .post('/bands')
        .send({
          name: 'Miles Davis',
          genre: 'Jazz',
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(2);
          expect(response.body).to.be.an('array');
          done();
        });
    });
  });

  describe(`[PUT] /bands/:id`, () => {
    it('should update a band at the provided Id', done => {
      const band = new Band({ name: 'Dave Brubeck', genre: 'Jazz' });
      band.save((err, band) => {
        chai
          .request(server)
          .put('/bands/' + band._id)
          .send({ name: 'The Dave Brubeck Quartet', genre: 'Jazz' })
          .end((err, response) => {
            const { _id, name, genre } = response.body[1];
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.equal(2);
            expect(_id).to.equal(band._id.toString());
            expect(name).to.equal('The Dave Brubeck Quartet');
            done();
          });
      });
    });
  });

  describe(`[DELETE] /bands/:id`, () => {
    it('should delete a band at the provided Id', done => {
      const band = new Band({ name: 'Dave Brubeck', genre: 'Jazz' });
      band.save((err, book) => {
        chai
          .request(server)
          .delete('/bands/' + band._id)
          .end((err, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(1);
            done();
          });
      });
    });
  });
});
