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
      populateServerTestDb()
        .then(_ => {
          console.log('db populated');
          done();
        })
        .catch(reason => console.log(reason));
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(_ => {
      mongoose.connection.close(done);
    });
  });

  describe(`[GET] /`, () => {
    it('should return an object with property `api` and value `r u n n i n g . . .` ', done => {
      chai
        .request(server)
        .get(`/`)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
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
              done(err);
              return;
            }

            expect(res.status).to.equal(200);
            expect(res.body.api).to.equal('route GET');
            done();
          });
      });
    });
  });

  describe('AMA', () => {
    describe(`[GET] /api/ama`, () => {
      it('should return all amas', done => {
        chai
          .request(server)
          .get('/api/ama')
          .end((err, res) => {
            if (err) {
              done(err);
              return;
            }

            expect(res).to.have.status(200);
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
              done(err);
              return;
            }

            expect(res).to.have.status(201);
            expect(res.body.question).to.equal(question);
            expect(res.body.answered).to.equal(false);
            expect(res.body.answer).to.equal(undefined);
            done();
          });
      });
    });

    //   describe(`[GET] /api/ama`, () => {
    //     it('should return all the amas`', done => {
    //       chai
    //         .request(server)
    //         .get(`/amas`)
    //         .then(res => {
    //           console.log(';res');
    //           expect(res.status).to.equal(150);
    //           done();
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           done(err);
    //         });
    //       // })
    //       // .end(function(err, res) {
    //       //   // if (err) console.log(err);

    //       //   // expect(res.body).to.deep.equal({
    //       //   //   message: `Error requesting ama with id ${id}`,
    //       //   // });
    //       // });
    //       // console.log('done');
    //       // setTimeout(_ => {
    //       //   done();
    //       // }, 1500);
    //     });
    //   });

    //   // describe(`[GET] /api/ama/id`, () => {
    //   //   it('should return an error message when ama is not found`', done => {
    //   //     const id = -1;

    //   //     chai
    //   //       .request(server)
    //   //       .get(`/api/ama/${id}`)
    //   //       .end((err, res) => {
    //   //         if (err) done(err);

    //   //         expect(res.status).to.equal(500);
    //   //         expect(res.body).to.deep.equal({
    //   //           message: `Error requesting ama with id ${id}`,
    //   //         });
    //   //         done();
    //   //       });
    //   //     // console.log('done');
    //   //   });
    //   // });

    //   // describe(`[POST] /api/ama/question`, () => {
    //   //   it('should add a new ama', done => {
    //   //     const newAma = {
    //   //       question: 'How do you succeed at Lambda School?',
    //   //     };

    //   //     chai
    //   //       .request(server)
    //   //       .post(`/api/ama/question`)
    //   //       // .type('body')
    //   //       .send(newAma)
    //   //       .end((err, res) => {
    //   //         if (err) done(err);

    //   //         expect(res).to.have.status(199);
    //   //         // expect(res.body.name).to.equal('Radiohead');
    //   //         done();
    //   //       });
    //   //   });
    //   // });
  });
});
