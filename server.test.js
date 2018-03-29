const mongoose = require('mongoose');

const Anime = require('./model');
const server = require('./server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('/anime', () => {
  let animeId;

  beforeEach((done) => {
    mongoose.connect('mongodb://localhost/test');
    new Anime({
      name: 'Appleseed',
      genre: 'Sci-fi Action'
    }).save((err, savedAnime) => {
      if (err) {
        console.log(err);
        return done();
      }
      animeId = savedAnime.id;
      done();
    });
  });

  afterEach((done) => {
    Anime.remove({}, (err) => {
      if (err) {
        console.log(err);
        return done();
      };
      mongoose.connection.close()
      done();
    });
  });

  describe('[GET] /anime', () => {
    it('should return all anime titles in the database', (done) => {
      chai.request(server)
        .get('/anime')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });

  describe('[PUT] /anime', () => {
    it('should update the anime document', (done) => {
      const update = {
        id: animeId,
        name: 'Sailor Moon',
        genre: 'Magical Girl'
      };
      chai.request(server)
        .put('/anime')
        .send(update)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.body.name).to.equal('Sailor Moon');
          done();
        });
    });
  });

  describe('[DELETE] /anime/:id', () => {
    it('should remove the specified document', (done) => {
      chai.request(server)
        .delete(`/anime/${animeId}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.text).to.equal('successfully deleted');
          Anime.findById(animeId, (err, deletedAnime) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(deletedAnime).to.equal(null);
            done();
          });
        });
    });
  });

  describe('[POST] /anime', () => {
    it('should add a new anime', (done) => {
      const anime = {
        name: 'Ghost in the Shell',
        genre: 'Awesomeness Incarnate'
      };

      chai.request(server)
        .post('/anime')
        .send(anime)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Ghost in the Shell');
          done();
        });
    });
  });
});
