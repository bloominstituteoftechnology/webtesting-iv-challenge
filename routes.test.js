const mongoose = require('mongoose');
const Animals = require('./Animals');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;

chai.use(chaiHTTP);

mongoose.connect('mongodb://localhost/test');

describe('/animals', () => {
  descride('[GET] /animals', () => {
    it('should get all of the animals', (done) => {
      chai.request(server)
        .get('/animals')
        .end((err, res) => {
          if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body.length).to.equal(0);
      })
    });
  });
});