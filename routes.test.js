const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server');
const Band = require('./band');

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  before(done => {
    mongoose.connect('mongodb://localhost/test', {}, err => {
      if (err) return console.log(err);
      console.log('TEST DB Connection Achieved');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  beforeEach(done => {
    const newBand = new Band({
      name: 'Radiohead',
      genre: 'Alt-rock'
    });
    newBand
      .save()
      .then(savedBand => {
        bandId = savedBand._id.toString();
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });
  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .then(response => {
          // console.log(response.body);
          const { _id, name, genre } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(bandId);
          expect(name).to.equal('Radiohead');
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it.skip('Should fail if bad URL is provided', () => { }); // puts in pending state
  });

  describe(`[POST] /api/bands`, () => {
    it('should save a document to the db', done => {
      chai
        .request(server)
        .post('/api/bands')
        .send({ name: 'Modest Mouse', genre: 'Indy' })
        .then(response => {
          // is res.body.length === 2?
          // console.log(response.body);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it(`Should fail if bad name or genre aren't provided`, done => {
      chai
        .request(server)
        .post('/api/bands')
        .send({ genre: 'Indy' })
        .then(response => {
          console.log(response.body.errors.name.message);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
  });
});