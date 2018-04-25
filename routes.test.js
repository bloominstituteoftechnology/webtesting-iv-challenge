const chai = require('chai');
const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server');
const Band = require('./Band');

chai.use(chaiHTTP);


mongoose.connect('mongodb://localhost/test', {}, () => {
  console.log('Connection to monog is successful');
});

describe('Bands', () => {

  beforeEach(done => {
    const newBand = new Band({
      name: 'Ajmal',
      genre: 'BAD'
    });

    newBand.save((err, response) => {
      if (err) {
        console.log('ERROR: ', err);
        done();
      } else {
        done();
      }
    });

  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) {
        console.log('Remove ERROR: ', err);
      }
      return done();
    });
  });

  describe('GET/api/bands', () => {

    it('should get the list of all bands stored in teh DB', done => {
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