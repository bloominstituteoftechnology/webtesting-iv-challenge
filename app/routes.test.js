const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-HTTP');

mongoose.connect('mongo://localhost:5000/test').then(error => {
  if (error) return console.log('There was an error connecting');
  console.log('Connection to mongo was a success');
});

const expect = chai.expect;
const router = require('./routes.js');
const Show = require('./shows.js');

chai.use(chaiHTTP);

describe('Shows to work', () => {
  let showId;
  beforeEach(done => {
    const newShow = new Show({
      title: 'Dexter',
      network: 'showtime'
    });
    newShow.save((err, savedShow) => {
      if (err) {
        console.log(err);
        done();
      }
      showId = savedShow._id;
      done();
    });
  });

  // for when DELETE is added
  // afterEach(done => {Show.remove({}, err)})

  describe('GET /api/shows', () => {
    it('should give a list of shows in database', done => {
      chai
        .request(router)
        .get('/api/shows')
        .end((err, res) => {
          if (err) {
            assert.typeOf(respose.status).to.be(500);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
    });
  });
});
