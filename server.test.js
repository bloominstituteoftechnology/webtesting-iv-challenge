const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Car = require('./models');

describe('Server', () => {
  let carID;
  before((done) => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error');
    });
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  beforeEach(done => {
    new Car({
      manufacturer: 'Lexus',
      name: 'LFA'
    }).save()
      .then(car => {
        carID = car.id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  afterEach(done => {
    Car.remove()
      .then(() => done())
      .catch(err => done(err))
  })

  describe('[POST] /cars', () => {
    it('should add a new car', (done) => {
      const newCar = {
        manufacturer: 'Ferrari',
        name: '458 Speciale'
      };
      chai.request(server)
        .post('/cars')
        .send(newCar)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('458 Speciale');
        });
        done();
    });
  });
  describe('[GET] /cars', () => {
    it('should return all cars', (done) => {
      chai.request(server)
        .get('/cars')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(1);
          expect(res.body[0].manufacturer).to.equal('Lexus');
        });
        done();
    });
  });

  describe('[PUT] /cars/:id', () => {
    it('should update a car', (done) => {
      const updatedCar = {
        manufacturer: 'McLaren',
        name: 'F1',
      };
      chai.request(server)
        .put(`/cars/${carID}`)
        .send(updatedCar)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body.manufacturer).to.equal('McLaren');
        });
        done();
    });
  });

  describe('[DELETE] /cars/:id', () => {
    it('should delete a car', (done) => {
      chai.request(server)
        .delete(`/cars/${carID}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
        done();
    });
  });
});