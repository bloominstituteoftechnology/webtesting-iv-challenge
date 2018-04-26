const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  return console.log('Test DB connected');
});

const expect = chai.expect;
const server = require('./server');
const Band = require('./band');

chai.use(chaiHTTP);

describe('/bands', () => {
  let id;
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
      id = savedBand._id;
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

            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });

    });
  });
});
