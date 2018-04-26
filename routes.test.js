const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('Test DB power level is over 9000!!!');
});

const expect = chai.expect;
const server = require('./server');
const Char = require('./charModel');

chai.use(chaiHTTP);

describe('Characters', () => {
  let charId;

  beforeEach((done) => {
    const newChar = new Char({
      name: 'Vegeta',
      race: 'Saiyan',
      planet: 'Vegeta'
    });

    newChar.save((err, savedChar) => {
      if (err) {
        console.log(err);
        done();
      }
      charId = savedChar._id;
      done();
    });
  });

  afterEach((done) => {
    Char.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/dbz-chars`, () => {
    it('should get a list of characters in the db', done => {
      chai
        .request(server)
        .get('/api/dbz-chars')
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
