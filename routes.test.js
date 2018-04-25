const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const Band = require('./Band.js');

const server = require('./server.js');
const expect = chai.expect;

chai.use(chaiHTTP);

mongoose.connect('mongodb://localhost/testMini', {}, err => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

describe('Bands', () => {
  let bandId;
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
      bandId = savedBand._id;
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
            // assert that err should be type status etc.
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          done();
        });
      // check if its an array
      // check if 200
      // check body
      // check id
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
            expect(response.status).to.equal(200);
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
            done();
          });
      });
    });
  });
});
