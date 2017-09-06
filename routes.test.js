const mongoose = require('mongoose');
const Food = require('./food');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');

// mongoose.connect('mongodb://localhost/test'); // ~~~> , { useMongoClient: true }, (err) => {...} ???
/* eslint no-console: 0 */
mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, (err) => {
  if (err) return console.log(err);
  console.log('DUDE! You are like totally connected to the TEST DataBase, man!');
});

mongoose.models = {};
mongoose.modelSchemas = {};

// const chai, { expect } = require('chai'); // ~~~> Linter unhappy ?
const expect = chai.expect;

chai.use(chaiHTTP);

describe('/food', () => {
  beforeEach((done) => {
    // beforeEach "hook" clears out db prior to each test, asynchronously with "done"
    // "Food.remove(...)" is asynchronous
    Food.remove({}, (err) => {
      if (err) console.log('Something went wrong!', err);
      done();
    });
  });

  describe('[GET] /food', () => {
    it('should GET all the Food', (done) => {
      chai.request(server)
        .get('/food')
        .end((err, res) => {
          if (err) return console.log('Ummm, Hume\'s Guillotine?\n', err.response.error);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });
});
