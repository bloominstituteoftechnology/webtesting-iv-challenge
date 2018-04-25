const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/movies', {}, err => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

const expect = chai.expect;
const server = require('./server');
const Movie = require('./movie');

chai.use(chaiHTTP);

describe('Movies', () => {
  let movieId;
  beforeEach(done => {
    const newMovie = new Movie({
      title: 'Shark Tales',
      genre: 'Animation'
    });
    newMovie.save((err, savedMovie) => {
      if (err) {
        console.log(err);
        done();
      }
      movieId = savedMovie._id;
      done();
    });
  });

  afterEach(done => {
    Movie.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/movies`, () => {
    it('should get a list of all the movies in db', done => {
      chai
        .request(server)
        .get('/api/movies')
        .end((err, response) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
      // check if its an array
      // check if 200
      // check body
      // check id
    });
  });
});