const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const User = require('../src/models.js');
const server = require('../src/server.js');

const { expect, assert } = chai;

chai.use(chaiHTTP);

describe('HTTP Routes', () => {

  before(done => {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/users');
  
    const db = mongoose.connection;

    db.on('error', () => {
      console.log('Connection Error');
    });

    db.once('open', () => {
      console.log('Connection Successfull');
      done();
    });

  });

  after(done => {

    const db = mongoose.connection.db;

    db.dropDatabase(() => {
      mongoose.connection.close(done);
    });

  });

  describe(`[POST] /api/users`, () => {

    it('should add a new User', done => {

      const user = {
        name: 'John Doe',
        email: 'john@doe.com',
      };

      chai
        .request(server)
        .post('/api/users')
        .send(user)
        .then((res) => {

          const newUser = res.body.response;

          expect(res.status).to.equal(201);
          expect(newUser.name).to.equal('John Doe');
          expect(newUser.email).to.equal('john@doe.com');

          done();

        })
        .catch((error) => done(error));

    });

  });

  describe(`[GET] /api/users`, () => {

    it('should get a list of users', done => {

      chai
        .request(server)
        .get('/api/users')
        .then((res) => {

          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.response).to.be.an('array');
          done();

        })
        .catch((error) => done(error));

    });

  });

  // describe(`[PUT] /api/users`, () => {

  //   it('should update user by :id', done => {

  //     const user = {
  //       name: "Jane Joe",
  //       email: "jane@doe.com",
  //     };

  //     chai
  //       .request(server)
  //       .put('/api/users/:id')
  //       .send(user)
  //       .then((res) => {

  //         const newUser = res.body.response;

  //         expect(res.status).to.equal(200);
  //         expect(newUser.name).to.equal('Jane Doe');
  //         expect(newUser.email).to.equal('jane@doe.com');
  //         done();

  //       })
  //       .catch((error) => done(error));

  //   });

  // });

});