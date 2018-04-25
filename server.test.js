const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', () => {
  if (err) return console.log(err);
  console.log('Connected to TEST DB');
});

const expect = chai.expect;
const server = require('./server.js');
const Data = require('./data.js');

chai.use(chaiHTTP);

describe('Something', () => {
  let dataId;
  beforeEach(done => {
    const newData = new Data({
      name: 'Binkus',
    });
    newData.save((err, savedData) => {
      if (err) {
        console.log(err);
        return done();
      }
      dataId = savedSata._id;
      done();
    });
  });

  afterEach(done => {
    Data.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /apli/data', () => {
    it('should get a list of all data', done => {
      chai
        .request(server)
        .get('/api/data')
        .end((err, res) => {
          if (err) {
            // assert that err should be type status
            console.log(err);
            done();
          }
          expect(res.status).to.equal(200);
          done();
          console.log(res);
        });
    });
  });
});

//check if array
//check if 200
//check body
//check id
