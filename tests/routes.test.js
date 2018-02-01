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
      done(new Error('Connection Error'));
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
          expect(res.body.success).to.be.true;
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

  describe(`[PUT] /api/users`, () => {
    
    it('should update user by :id', done => {

      User.findOne()
        .then((res) => {

          const thisUser = res;

          const user = {
            name: "Jane Doe",
            email: "jane@doe.com",
          };

          chai
          .request(server)
          .put(`/api/users/${ thisUser._id }`)
          .send(user)
          .then((res) => {

            const newUser = res.body.response;

            expect(res.status).to.equal(200);
            expect(res.body.success).to.be.true;
            expect(newUser.name).to.equal('Jane Doe');
            expect(newUser.email).to.equal('jane@doe.com');
            done();

          })
          .catch((error) => done(error));

        })
        .catch((error) => {
          done(error);
        })

    });

  });

  describe(`[DELETE] /api/users`, () => {
    
    it('should remove user by :id', done => {

      User.findOne()
        .then((res) => {

          const thisUser = res;

          chai
          .request(server)
          .delete(`/api/users/${ thisUser._id }`)
          .then((res) => {

            const newUser = res.body.response;

            expect(res.status).to.equal(202);
            expect(res.body.success).to.be.true;

            User.findById(newUser._id)
              .then((response) => {
                
                if (response === null) done();
                else done(new Error("Failed to remove user"));

              })
              .catch((error) => {
                done(error);
              })

          })
          .catch((error) => done(error));

        })
        .catch((error) => {
          done(error);
        })

    });

  });

});