const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server');
const Band = require('./Band');

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  before(done => {
    mongoose.connect('mongodb://localhost/test', {}, err => {
      if (err) return console.log(err);
      console.log('TEST for DB Connection Achieved');
    });
    done();
  });
  after(done => {
    mongoose.connection.close();
    done();
  });
  beforeEach(done => {
    const newBand = new Band({
      name: 'Metallica',
      genre: 'Metal',
      recentAlbum: 'Ride the Lightning',
    });
    newBand.save((err, savedBand) => {
      if (err) {
        console.log(err);
      } else {
        bandId = savedBand._id;
      }
      done();
    });
    // ()
    // .then(savedBand => {
    //   bandId = savedBand._id;
    //   done();
    // })
    // .catch(err => {
    //   console.log(err);
    //   done();
    // });

    // creates new band
    // const newBand2 = new Band({
    //   name: 'Skillet',
    //   genre: 'Rock',
    //   recentAlbum: 'Unleashed',
    // });
    // // saves the above band to the database
    // newBand2.save((err, savedBand) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   done();
    // });
  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in the db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.lengthOf(1);
          done();
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
        .post('/api/bands')
        .send(createBand)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          //   expect(response.status).to.equal(201);
          expect(response.body).to.haveOwnProperty('_id');
          expect(response.body).to.haveOwnProperty('name');
          expect(response.body).to.haveOwnProperty('genre');
          expect(response.body).to.haveOwnProperty('recentAlbum');
          done();
        });
    });
  });

  describe('[PUT] /api/bands/:id', () => {
    it('should update a band object on the database', done => {
      const updatedBand = {
        name: 'skillet',
        genre: 'Rock',
      };
      chai
        .request(server)
        .put(`/api/bands/${bandId}`)
        .send(updatedBand)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.body).to.haveOwnProperty('_id');
          expect(response.body).to.haveOwnProperty('name');
          expect(response.body).to.haveOwnProperty('genre');
          expect(response.body).to.haveOwnProperty('recentAlbum');
          expect(response.body.name).to.equal(updatedBand.name.toUpperCase());
          done();
        });
    });
  });
});
