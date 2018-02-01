const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect();

const server = require('./server');
chai.use(chaiHTTP);

describe('/movies', () => {
    let movieId;
  
    beforeEach((done) => {
      new Movie({
        title: 'Who am I'
      }).save((err, savedMovie) => {
        if (err) {
          console.log(err);
          return done();
        }
        movieId = savedMovie.id;
        done();
      });
    });
  
    afterEach((done) => {
      Movie.remove({}, (err) => {
        if (err) console.log(err);
        done();
      });
    });
  
  describe(`movie api`, () => {
    describe(`[GET] '/movies'`, () => {});
    it('should return an string Movies Collection', done => {
      chai
        .request(server)
        .get('/movies')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.text).to.be.a('string');
          expect(res.body.text).to.equal('Movies Collection');
          done();
        });
    });
  });
  
  describe('[POST] /movies', () => {
    it('should add a new movie', (done) => {
      const movie = {
        title: 'Who am I'
      };
  
      chai.request(server)
        .post('/movies')
        .send(movie)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Who am I');
          done();
        });
    });
  });
  
  describe('[DELETE] /movies/:id', () => {
    it('should remove specific movie form db', (done) => {
      chai.request(server)
        .delete(`/movies/${movieId}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.text).to.equal('success');
          Movie.findById(movieId, (err, deletedMovie) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(deletedMovie).to.equal(null);
            done();
          });
        });
    });
  });
  
  describe('[PUT] /movies', () => {
    it('should update movies', (done) => {
      const update = {
        id: movieId,
        title: 'Titanic'
      };
      chai.request(server)
        .put('/movies')
        .send(update)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.equal('Titanic');
          done();
        });
    });
  });
  });