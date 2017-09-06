const mongoose = require('mongoose');
const Food = require('./food');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test'); // ~~~> , { useMongoClient: true }, (err) => {...} ???

// const chai, { expect } = require('chai'); // ~~~> Linter unhappy ?
const expect = chai.expect;

chai.use(chaiHTTP);

/* eslint no-console: 0 */
describe('/food', () => {
  beforeEach((done) => {
    // beforeEach "hook" clears out db prior to each test, asynchronously with "done"
    Food.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
});
