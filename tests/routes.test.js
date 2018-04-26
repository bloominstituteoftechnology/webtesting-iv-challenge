// connect to a 'test' dummy database server
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

const expect = chai.expect;
const server = require('../server');
const Band = require('../Model');

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  beforeEach(done => {
    const newBand = new Band({
      name: 'Radiohead',
      genre: 'Alternative Rock',
      numberOfMembers: 5,
      yearFounded: 1985
    });
    newBand.save((err, savedBand) => {
      if (err) {
        console.log(err);
        done();
      }
      bandId = savedBand.id;
      done();
    });
  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe(`[POST] /api/bands`, () => {
    it('should create a new band in the db', done => {
      const band = new Band({
        name: 'Tool',
        genre: 'Progressive Rock',
        numberOfMembers: 4,
        yearFounded: 1990
      });
      chai
        .request(server)
        .post('/api/bands')
        .send(band)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe(`[GET] /api/bands`, () => {
    it('should get a list of bands from the db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(1);
          expect(Array.isArray(res.body)).to.equal(true);
          done();
        });
    });
  });

  describe(`[PUT] /api/bands/:id`, () => {
    it('should update the band document in the db', done => {
      const update = {
        name: 'White Denim',
        genre: 'Rock',
        numberOfMembers: 4,
        yearFounded: 2006
      };
      chai
        .request(server)
        .put(`/api/bands/${bandId}`)
        .send(update)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('White Denim');
          expect(res.body.genre).to.equal('Rock');
          expect(res.body.numberOfMembers).to.equal(4);
          expect(res.body.yearFounded).to.equal(2006);
          done();
        });
    });
  });

  describe(`[DELETE] /api/bands/id`, () => {
    it('should delete the band document from the db', done => {
      chai
        .request(server)
        .delete(`/api/bands/${bandId}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          Band.findById(bandId, (err, deletedBand) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(deletedBand).to.equal(null);
          });
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
