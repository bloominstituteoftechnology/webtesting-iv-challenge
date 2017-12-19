const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('./server.js');

chai.use(chaiHTTP);
const { expect } = chai;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/server-test');
const User = require('./models.js');

/* eslint no-console: ["error", { allow: ["error"] }] */
describe('server-test API', () => {
  describe('[GET] "/foo"', () => {
    it('should have status of 200', (done) => {
      chai
        .request(server)
        .get('/foo')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return "bar".', (done) => {
      chai
        .request(server)
        .get('/foo')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.text).to.equal('bar');
          done();
        });
    });
    it('should not have any other operations.', (done) => {
      const endCheck = value => (err, res) => {
        if (err && err.status !== 404) console.error(err);
        expect(res.error.text).to.include(`Cannot ${value} /foo`);
        if (value === 'DELETE') done();
      };
      chai
        .request(server)
        .post('/foo')
        .end(endCheck('POST'));
      chai
        .request(server)
        .put('/foo')
        .end(endCheck('PUT'));
      chai
        .request(server)
        .delete('/foo')
        .end(endCheck('DELETE'));
    });
  });

  describe('[GET] "/monsters"', () => {
    it('should return with a 404.', (done) => {
      chai
        .request(server)
        .get('/monsters')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('[GET] "/users"', () => {
    beforeEach((done) => {
      const usernames = ['ryan@ryan.com', 'larry@ryan.com', 'thomas@lambdaSchoolRocks.com', 'austen@millionaresClub.com', 'admin@admin.com'];
      for (let i = 0; i <= 5; i++) {
        const username = usernames[i];
        const password = `password${i}`;
        const nUser = new User({ username, password });
        nUser.save();
      }
      done();
    });

    afterEach((done) => {
      User.remove({}, (err) => {
        if (err) console.error(err.message);
        done();
      });
    });

    it('should return an array of objects', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0]).to.be.an('object');
          done();
        });
    });

    it('should have a "username" and "password" property', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          expect(res.body[0]).to.have.property('username');
          expect(res.body[0]).to.have.property('password');
          done();
        });
    });
  });

  describe('[POST] "/users"', () => {
    after((done) => {
      User.remove({}, (err) => {
        if (err) console.error(err.message);
        done();
      });
    });

    it('should return a user object', (done) => {
      const myUser = {
        username: 'ivan@wow.com',
        password: 'myOtherJobIsA_MOBA',
      };

      chai
        .request(server)
        .post('/users')
        .send(myUser)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('username', myUser.username);
          expect(res.body).to.have.property('password', myUser.password);
          done();
        });
    });

    it('should be in the database', (done) => {
      User
        .findOne({ username: 'ivan@wow.com' })
        .then((fUser) => {
          expect(fUser).to.not.equal(undefined);
          expect(fUser).to.have.property('_id');
          expect(fUser).to.have.property('username', 'ivan@wow.com');
          done();
        })
        .catch(err => console.error(err));
    });
  });

  describe('[PUT] "/user/:id"', () => {
    const myUser = {
      username: 'ivan@wow.com',
      password: 'myOtherJobIsA_MOBA',
    };
    let id;
    before((done) => {
      const newUser = new User(myUser);
      newUser
        .save()
        .then((nUser) => { id = nUser._id; });
      done();
    });
    after((done) => {
      User.remove({}, (err) => {
        if (err) console.error(err.message);
        done();
      });
    });
    it('shouldn\'t allow put without id', (done) => {
      chai
        .request(server)
        .put('/users')
        .send({ username: 'blah@blah.blah' })
        .end((err, res) => {
          if (err && err.status !== 404) console.error(err);
          expect(res.error.text).to.include('Cannot PUT /users');
          done();
        });
    });
    it('should reject it doesn\'t username or password', (done) => {
      chai
        .request(server)
        .put(`/users/${id}`)
        .send({})
        .end((err) => {
          expect(err.status).to.equal(422);
          done();
        });
    });
    it('should properly update users', (done) => {
      chai
        .request(server)
        .put(`/users/${id}`)
        .send({ username: 'ryan@nyanCat.com' })
        .end((err, res) => {
          // console.log(res);
          expect(res.body).to.have.property('username', 'ryan@nyanCat.com');
          User
            .findById(id)
            .then((fUser) => {
              expect(fUser.username).to.not.equal(myUser.username);
              expect(fUser.username).to.equal('ryan@nyanCat.com');
              expect(fUser.password).to.equal(myUser.password);
              done();
            })
            .catch(error => console.error(error));
        });
    });
  });
  describe('[DELETE] "/users/:id"', () => {
    let id;
    const myUser = {
      username: 'Luis@theOneRing.com',
      password: 'myPr3c10u5',
    };
    beforeEach((done) => {
      const newUser = new User(myUser);
      newUser
        .save()
        .then((nUser) => {
          id = nUser._id;
          done();
        });
    });
    afterEach((done) => {
      User.remove({}, (err) => {
        if (err) console.error(err);
      });
      done();
    });
    it('should successfully delete a user', (done) => {
      chai
        .request(server)
        .delete(`/users/${id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          User.findById(id, (error, user) => {
            expect(!user).to.equal(true);
          });
        });
      done();
    });
  });
});
