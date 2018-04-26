const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', {}, (err) => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

const expect = chai.expect;
const server = require('./server');
const Dessert = require('./dessert');

chai.use(chaiHTTP);

describe('Desserts', () => {
  let dessertId;
  beforeEach((done) => {
    const newDessert = new Dessert({
      name: 'Ben and Jerrys',
      variety: 'Ice cream',
    });
    newDessert.save((err, savedDessert) => {
      if (err) {
        console.log(err);
        done();
      }
      dessertId = savedDessert._id;
      done();
    });
  });

  afterEach((done) => {
    Dessert.remove({}, (err) => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/desserts`, () => {
    it('should get a list of all the desserts in db', (done) => {
      chai
        .request(server)
        .get('/api/desserts')
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
