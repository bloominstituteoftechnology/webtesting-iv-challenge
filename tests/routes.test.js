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
});
