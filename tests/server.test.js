const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;

const Ama = require('../mvc/models/ama/ama');

const server = require('../server');

const mongodAuth = require('../config').mongodAuth;

const {
  populateServerTestDb,
  getTestAmasLength,
  serverTestAmas,
} = require('./populate');

chai.use(chaihttp);

describe('Server', () => {
  before(done => {
    mongoose.connect(
      'mongodb://localhost/server-testing_server-test_db',
      mongodAuth,
    );

    const db = mongoose.connection;

    db.on('error', _ => console.log('Error connecting to db.'));
    db.once('open', _ => {
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(_ => {
      mongoose.connection.close(done);
    });
  });

  beforeEach(done => {
    Ama.remove(_ => {
      populateServerTestDb()
        .then(_ => {
          // console.log('db populated');
          done();
        })
        .catch(reason => console.log(reason));
    });
  });

  afterEach(done => {
    Ama.remove(_ => {
      done();
    });
  });

  describe(`[GET] /`, () => {
    it('should return an object with property `api` and value `r u n n i n g . . .` ', done => {
      chai
        .request(server)
        .get(`/`)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }

          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({ api: 'r u n n i n g . . .' });
          done();
        });
    });
  });

  describe('API', () => {
    describe(`[GET] /api`, () => {
      it('should return `route GET` with key `api`', done => {
        chai
          .request(server)
          .get('/api')
          .end((err, res) => {
            if (err) {
              console.log(err);
            }

            expect(res.status).to.equal(200);
            expect(res.body.api).to.equal('route GET');
            done();
          });
      });
    });
  });

  describe('AMA', () => {
    describe(`[POST] /api/ama/question`, () => {
      it('should correctly save a question', done => {
        const question =
          'Why should I choose Lambda School over other CS programs?';
        const ama = { question };

        chai
          .request(server)
          .post('/api/ama/question')
          .send(ama)
          .end((err, res) => {
            if (err) {
              console.log(err);
            }

            expect(res).to.have.status(201);
            expect(res.body.question).to.equal(question);
            expect(res.body.answered).to.equal(false);
            expect(res.body.answer).to.equal(undefined);
            done();
          });
      });

      it('should return 422 when the request body is malformed', done => {
        const ama = { question1: 'question1 should be question' };

        chai
          .request(server)
          .post('/api/ama/question')
          .send(ama)
          .end((err, res) => {
            if (err) {
              // console.log(err);
            }

            expect(res).to.have.status(422);
            done();
          });
      });

      it('should return some kind of message when the request body is malformed', done => {
        const ama = { question1: 'question1 should be question' };

        chai
          .request(server)
          .post('/api/ama/question')
          .send(ama)
          .end((err, res) => {
            if (err) {
              // console.log(err);
            }

            expect(Object.keys(res.body)).to.have.lengthOf.above(0);
            done();
          });
      });
    });

    describe(`[GET] /api/ama`, () => {
      it('should return a status code of 200', done => {
        chai
          .request(server)
          .get('/api/ama')
          .end((err, res) => {
            if (err) {
              console.log(err);
            }

            expect(res).to.have.status(200);
            done();
          });
      });

      it('should return all amas', done => {
        chai
          .request(server)
          .get('/api/ama')
          .end((err, res) => {
            if (err) {
              console.log(err);
            }

            expect(res.body.length).to.equal(getTestAmasLength());

            expect(res.body[0].question).to.equal(serverTestAmas[0].question);
            expect(res.body[0].answered).to.equal(false);
            expect(res.body[0].answer).to.equal(undefined);

            expect(res.body[1].question).to.equal(serverTestAmas[1].question);
            expect(res.body[1].answered).to.equal(serverTestAmas[1].answered);
            expect(res.body[1].answer).to.equal(serverTestAmas[1].answer);
            done();
          });
      });
    });

    describe(`[PUT] /api/ama/id`, () => {
      //
    });
  });
});
