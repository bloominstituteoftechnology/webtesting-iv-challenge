const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/metatest', () => {
  if (err) return console.log(err);
  console.log('Connected to TEST DB');
});

const expect = chai.expect;
const server = require('./server.js');
const Meta = require('./Meta.js');
const Deck = require('./Deck.js');
const Pilot = require('./Pilot.js');

chai.use(chaiHTTP);

describe('MTG META', () => {
  let MetaId;
  beforeEach(done => {
    const newMeta = new Meta({
      name: 'Binkus',
    });
    newMeta.save((err, savedMeta) => {
      if (err) {
        console.log(err);
        return done();
      }
      MetaId = savedSata._id;
      done();
    });
  });

  afterEach(done => {
    Meta.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /api/metas', () => {
    it('should get a list of all metas in the db', done => {
      chai
        .request(server)
        .get('/api/Metas')
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
