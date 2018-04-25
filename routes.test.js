const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/metatest', () => {
  if (err) return console.log('errorrr');
  console.log('Connected to TEST DB');
});

const expect = chai.expect;
const server = require('./server.js');
const Meta = require('./metas/Meta.js');
const Deck = require('./decks/Deck.js');
const Pilot = require('./pilots/Pilot.js');

chai.use(chaiHTTP);

describe('MTG META', () => {
  let MetaId;
  before(done => {
    const newMeta = new Meta({
      name: 'Binkus',
      location: 'SF Bay',
      password: 'pw',
    });
    newMeta.save((err, savedMeta) => {
      if (err) {
        console.log(err);
        return done();
      }
      MetaId = savedMeta._id;
      done();
    });
  });

  after(done => {
    Meta.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /api/metas', () => {
    it('should get a list of all metas in the db', done => {
      chai
        .request(server)
        .get('/api/metas')
        .end((err, res) => {
          if (err) {
            // assert that err should be type status
            console.log(err);
            done();
          }
          expect(res.status).to.equal(200);
          done();
          console.log(res.body);
        });
    });
  });
  describe('[POST] /api/metas', () => {
    it('should post a new meta to the db', done => {
      chai
        .request(server)
        .post('/api/metas', '')
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
  describe('[GET] /api/metas/:meta', () => {
    it('should return a meta', done => {
      chai
        .request(server)
        .get(`/api/metas/meta1`)
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
  describe('[PUT] /api/metas/:meta', () => {
    it('should update a meta in the db', done => {
      chai
        .request(server)
        .put('/api/metas/meta1', '')
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
  describe('[DELETE] /api/metas/:meta', () => {
    it('should delete a meta in the db', done => {
      chai
        .request(server)
        .delete('/api/metas/meta1', '')
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
