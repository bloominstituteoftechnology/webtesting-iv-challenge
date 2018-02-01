const server = require('./server');
const User = require('./models/user');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
chai.use(chaiHTTP);

describe('Movie Server', () => {
  let userId;
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Mongo connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  beforeEach((done) => {
    new User({
      fName: 'mei',
      lName: 'qu',
      email: '123@123.com'
    }).save((err, savedUser) => {
      if (err) {
        console.log(err);
        return done();
      }
      userId = savedUser.id;
      done();
    });
  });

  afterEach(done => {
    User.remove()
      .then(() => done())
      .catch(error => done(error));
  });

  describe(`[POST] /api/users`, () => {
    it('should add a new user', (done) => {
      const newUser = {
        fName: 'ting',
        lName: 'wang',
        email: '123@123.com'
      };
      chai
        .request(server)
        .post('/api/users')
        .send(newUser)
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res.body.user.fName).to.equal('ting');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe(`[GET] /api/users`, () => {
    it('should give all the users', done => {
      chai
        .request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0].fName).to.equal('mei');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe(`[GET] /api/users/:id`, () => {
    it('should give a user by given id', (done) => {
      chai
        .request(server)
        .get(`/api/users/${userId}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.fName).to.equal('mei');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe(`[PUT] /api/users/:id`, () => {
    it('should update a user by given id', (done) => {
      const update = { fName: 'jiamei', lName: 'qu', email: '234@234.com' };
      chai
        .request(server)
        .put(`/api/users/${userId}`)
        .send(update)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.fName).to.equal('jiamei');
          expect(res.body.email).to.equal('234@234.com');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe(`[DELETE] /api/users/:id`, () => {
    it('should delete a user by given id', (done) => {
      chai
        .request(server)
        .delete(`/api/users/${userId}`)
        .then(res => {
          expect(res.status).to.equal(200);
          done();
        })
        .catch(err => done(err));
    });
  });
});