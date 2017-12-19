const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/movie-test', { useMongoClient: true });

const server = require('./server');
// require your models

describe(`movie api`, () => {
  describe(`[GET] '/movies'`, () => {});
  it('should return an string Movies Collection', done => {
    chai
      .request(server)
      .get('/movies')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.text).to.be.a('string');
        expect(res.body.text).to.equal('Movies Collection');
        done();
      });
  });

  // describe(`[GET] '/monsters'`, () => {
  //   it('should return an array of monsters', done => {
  //     chai
  //       .request(server)
  //       .get('/monsters')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(Array.isArray(res.body)).to.equal(true);
  //         done();
  //       });
  //   });
  // });
});
