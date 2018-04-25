const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const Band = require('./model');
const server = require('./server');

chai.use(chaiHTTP);
const expect = chai.expect;

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('Connected to Test DB');
});

describe('Bands', () => {
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
      bandId = savedBand._id;
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
          }
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
