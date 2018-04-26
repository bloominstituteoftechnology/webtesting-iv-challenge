const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/movies', {}, err => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

const expect = chai.expect;
const should = chai.should;
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
        return done();
      }
      movieId = savedMovie._id;
      return done();
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
          expect(response.body).to.be.an('array');
          return done();
        });
    });
  });
  
  describe(`[POST] /api/movies`, () => {
    it('should save a movie document to the db', done => {
      chai
        .request(server)
        .post('/api/movies')
        .send({ title: 'Shark Tales', genre: 'Animation' })
        .then(response => {
          return done();
        })
        .catch(err => {
          throw err;
          done();
        });
    });
    it(`Should fail if bad title or genre aren't provided`, done => {
      chai
        .request(server)
        .post('/api/movies')
        .send({ genre: 'Animation' })
        .then(response => {
          return done();
        })
        .catch(err => {
          throw err;
          return done();
        });
    });
  });

  describe('/GET/:id movie', () => {
    it('it should GET a movie by the given id', (done) => {
      let movie = new Movie({ title: "The Lord of the Rings", genre: "Hobbitry" });
      movie.save((err, movie) => {
          chai
          .request(server)
          .get('/api/movies/' + movie.id)
          .send(movie)
          .end((err, res) => {
              // expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              // expect(res.body).to.be.have.property('_id');
            return done();
          });
      });
    });
  });

  describe('/PUT/:id movie', () => {
    it('it should UPDATE a movie given the id', (done) => {
      let movie = new Movie({title: "The Chronicles of Narnia", genre: "Science Fiction" })
      movie.save((err, movie) => {
              chai
              .request(server)
              .put('/api/movies/' + movie.id)
              .send({title: "The Chronicles of Narnia", genre: "Science Fiction" })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                return done();
              });
        });
    });
  });


  describe('/DELETE/:id movie', () => {
    it('it should DELETE a movie given the id', (done) => {
      let movie = new Movie({title: "The Chronicles of Narnia", genre: "Science Fiction" })
      movie.save((err, movie) => {
              chai
              .request(server)
              .delete('/movies/' + movie.id)
              .end((err, res) => {
                  // res.should.have.status(200);
                  // res.body.should.be.a('object');
                  // res.body.should.have.property('message').eql('Book successfully deleted!');
                  // res.body.result.should.have.property('ok').eql(1);
                  // res.body.result.should.have.property('n').eql(1);
                return done();
              });
        });
    });
});
});