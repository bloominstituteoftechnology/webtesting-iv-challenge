// connect to a 'test' dummy database server
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');


mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

const expect = chai.expect;
const server = require('./server');
const Band = require('./band');

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  beforeEach(done => {
    const newBand = new Band({
      name: 'Radiohead',
      genre: 'Alt-rock'
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

  describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, response) => {
          if (err) {
            // assert that err should be type status etc.
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
      // check if its an array
      // check if 200
      // check body
      // check id
    });
  });
});
