const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/food-test', { useMongoClient: true });

const server = require('./server');
// require your models

describe(`food api`, () => {
  // beforeEach(() => {
  //   const newFood = new Food('Spaghetti');
  //   newFood.save();
  // })
  // afterEach(() => {
  //   deleting data in your test db.
  //   Food.remove({}, (err) => {
  //   done();
  // });
  // })

  describe(`[GET] '/food'`, () => {});
  it('should return an string hello world', done => {
    chai
      .request(server)
      .get('/food')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.text).to.be.a('string');
        expect(res.body.text).to.equal('hello world');
        done();
      });
  });

  describe(`[GET] '/monsters'`, () => {
    it('should return an array of monsters', done => {
      chai
        .request(server)
        .get('/monsters')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          done();
        });
    });
  });
});
