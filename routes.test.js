const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server.js');
const Meta = require('./metas/Meta.js');
const Deck = require('./decks/Deck.js');
const Pilot = require('./pilots/Pilot.js');

chai.use(chaiHTTP);

describe('Routes', () => {
  before (done => {
    mongoose.connect('mongodb://localhost/metatest', {}, err => {
      if (err) return console.log('Start your mongo DB!');
      console.log('TEST DB Connection Achieved');
    });
    done();
  })
  beforeEach(done => {
    const newMeta = {
      name: 'Binkus',
      location: 'SF Bay',
      password: 'pw',
    };
    const newMeta2 = {
      name: 'Bink',
      location: 'SF Bay',
      password: 'pw',
    };
    const newMeta3 = {
      name: 'Boinkus',
      location: 'SF Bay',
      password: 'pw',
    };
    Meta.create(newMeta, newMeta2, newMeta3, function(
      err,
      newMeta,
      newMeta2,
      newMeta3
    ) {
      if (err) console.log(err);
    });
    done();
  });

  afterEach(done => {
    Meta.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  })

  after(done => {
    mongoose.connection.close();
    done();
  });

  describe('[GET] /api/metas', () => {
    it('should get a list of all metas in the db with status 200:OK', done => {
      chai
        .request(server)
        .get('/api/metas')
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(500);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
        });
      done();
    });
  });
  describe('[POST] /api/metas', () => {
    it('should post a new meta to the db', done => {
      chai
        .request(server)
        .post('/api/metas')
        .send({
          'name': 'added meta',
          'location': 'San Diego',
          'password': '123'
          })
          .end(function(err, res) {
            expect(res).to.have.status(201);
            done();
          });
    });
  });
  describe('[GET] /api/metas/:meta', () => {
    it('should return a meta', done => {
      chai
        .request(server)
        .get(`/api/metas/Bink`)
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(501);
            done();
          }
          expect(res.status).to.equal(201);
          done();
          console.log(res);
        });
    });
  });
  describe('[PUT] /api/metas/:meta', () => {
    it('should update a meta in the db', done => {
      chai
        .request(server)
        .put('/api/metas/Bink')
        .send({
          name: 'Updated Bink',
          location: 'SF Bay',
          password: 'pw',
        })
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(500);
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
        .delete('/api/metas/Boinkus')
        .send({})
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(500);
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
