const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const Band = require('./model');
const server = require('./server');

chai.use(chaiHTTP);
const expect = chai.expect;

describe('Bands', () => {
  let bandId;
  before(done => {
    mongoose.connect('mongodb://localhost/test', {}, err => {
      if (err) return console.log(err);
      console.log('Connected to Test DB');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  beforeEach(done => {
    const newBand = new Band({
      bandName: 'A Day To Remember',
      bandGenre: 'post-hardcore'
    });
    newBand.save((err, savedBand) => {
      if (err) {
        console.log(err);
        return done();
      }
      bandId = savedBand._id.toString();
      return done();
    });
  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].bandName).to.equal('A Day To Remember');
          expect(res.body[0].bandGenre).to.equal('post-hardcore');
          return done();
        });
    });
  });
  describe(`[POST] /api/bands`, () => {
    it('should save a document to the database', done => {
      chai
        .request(server)
        .post('/api/bands')
        .send({ bandName: 'Bring Me The Horizon', bandGenre: 'post-hardcore' })
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.body[1].bandName).to.equal('Bring Me The Horizon');
          expect(res.body[1].bandGenre).to.equal('post-hardcore');
          expect(res.body.length).to.equal(2);
          return done();
        });
    });
  });
  describe(`[PUT] /api/bands/:id`, () => {
    it('should update the band at the specified ID', done => {
      const band = new Band({ bandName: 'BearTooth', bandGenre: 'hardcore' });
      band.save((err, band) => {
        chai
          .request(server)
          .put('/api/bands/' + band._id)
          .send({ bandName: 'BearTooth', bandGenre: 'hardcore' })
          .end((err, res) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(res.status).to.equal(200);
            expect(res.body.bandName).to.equal('BearTooth');
            expect(res.body.bandGenre).to.equal('hardcore');
            return done();
          });
      });
    });
  });
  describe(`[DELETE] /api/bands/:id`, () => {
    it('should delete the band at the specified ID', done => {
      const band = new Band({ bandName: 'BearTooth', bandGenre: 'hardcore' });
      band.save((err, band) => {
        chai
          .request(server)
          .delete('/api/bands/' + band._id)
          .end((err, res) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(res.status).to.equal(200);
            return done();
          });
      });
    });
  });
});
