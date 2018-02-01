const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/server-testing-mini');
const server = require('./server');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const Person = require('./person');
chai.use(chaiHTTP);

describe('Routes', () => {
  beforeEach((done) => {
    const person = new Person({
      firstName: 'Patrick',
      lastName: 'Sandoval'
    });
    person.save().then(() => done()).catch((err) => done(err));
  });
  after(done => {
    Person.remove().then(() => done()).catch((err) => done(err));
  });

  describe('[POST] /people', () => {
    it('should create a person', (done) => {
      const person = {
        firstName: 'Patrick',
        lastName: 'Sandoval'
      };
      chai
      .request(server)
      .post('/people')
      .send(person)
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.person.firstName).to.equal('Patrick');
        done();
      }).catch((err) => done(err));
    });
    it('should return a 400 error for invalid input', (done) => {
      chai
        .request(server)
        .post('/people')
        .send({})
        .then((res) => {
          return done(new Error('should have failed with 400'));
        }).catch((err) => {
          expect(err.status).to.equal(400);
          expect(err.response.body.success).to.equal(false);
          done();
        });
    });
  });

  describe('[GET] /people', () => {
    it('should return an array of people', (done) => {
      chai
        .request(server)
        .get('/people')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.people).to.be.an('array');
          expect(res.body.people[0].firstName).to.equal('Patrick');
          done();
        }).catch((err) => done(err));
    });
    it('should return a 404 error if no people exist in the database', (done) => {
      Person.remove().then(() => {
        chai
        .request(server)
        .get('/people')
        .then((res) => {
          return done(new Error('should have failed with 404'));
        }).catch((err) => {
          expect(err.status).to.equal(404);
          expect(err.response.body.success).to.equal(false);
          done();
        });
      });
    });
  });

  describe('[GET] /people/:id', () => {
    it('should return a person by their id', (done) => {
      Person.findOne().then((person) => {
        chai.request(server).get(`/people/${person._id}`).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.person.firstName).to.equal('Patrick');
          done();
        });
      }).catch((err) => done(err));
    });
    it('should return an error if the person does not exist', (done) => {
      const id = mongoose.Types.ObjectId();
      chai.request(server).get(`/people/${id}`).then((person) => {
        return done(new Error('should have failed with 404'));
      }).catch((err) => {
        expect(err.status).to.equal(404);
        expect(err.response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('[PUT] /people/:id', () => {
    it('should update a person by their id and request body', (done) => {
      Person.findOne().then((person) => {
        chai.request(server).put(`/people/${person._id}`)
          .send({firstName: 'Pat'})
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.person.firstName).to.equal('Pat');
            done();
          });
      }).catch((err) => done(err));
    });
    it('should return an error if the person does not exist', (done) => {
      const id = mongoose.Types.ObjectId();
      chai.request(server).put(`/people/${id}`).then((res) => {
        return done(new Error('should have failed with 404'));
      }).catch((err) => {
        expect(err.status).to.equal(404);
        expect(err.response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('[DELETE] /people:id', () => {
    it('should delete a person by their id', (done) => {
      Person.findOne().then((person) => {
        chai.request(server).del(`/people/${person._id}`).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.success).to.equal(true);
          done();
        });
      }).catch((err) => done(err));
    });
    it('should return an error if the person does not exist', (done) => {
      const id = mongoose.Types.ObjectId();
      chai.request(server).del(`/people/${id}`).then((res) => {
        return done(new Error('should have failed with 404'));
      }).catch((err) => {
        expect(err.status).to.equal(404);
        expect(err.response.body.success).to.equal(false);
        done();
      });
    });
  });
});