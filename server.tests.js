const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('TEST for DB Connection Achieved');
});

const expect = chai.expect;
const server = require('./server');
const Band = require('./Band');

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  beforeEach(done => {
    const newBand = new Band({
      name: 'Metallica',
      genre: 'Metal',
      recentAlbum: 'Ride the Lightning',
    });
    newBand.save((err, savedBand) => {
      if (err) {
        console.log(err);
      }
      bandId = savedBand._id;
    });
    // creates new band
    const newBand2 = new Band({
      name: 'Skillet',
      genre: 'Rock',
      recentAlbum: 'Unleashed',
    });
    // saves the above band to the database
    newBand2.save((err, savedBand) => {
      if (err) {
        console.log(err);
      }
      bandId = savedBand._id;
    });
    return done();
  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // Tests
  describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in the db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, response) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.lengthOf(2);
          return done();
        });
    });
  });

  describe('[POST] /api/bands', () => {
    it('should add a new band object to the database', done => {
      const createBand = {
        name: 'BonJovi',
        genre: 'Classic Rock',
        recentAlbum: 'Bounce',
      };
      chai
        .request(server)
        .post('/api/bands', {
          name: 'BonJovi',
          genre: 'Classic Rock',
          recentAlbum: 'Bounce',
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
            return done();
          }
          console.log(response);
          //   expect(response.status).to.equal(201);
          expect(response.body).to.haveOwnProperty('_id');
          expect(response.body).to.haveOwnProperty('name');
          expect(response.body).to.haveOwnProperty('genre');
          expect(response.body).to.haveOwnProperty('recentAlbum');
        });
    });
  });
});
