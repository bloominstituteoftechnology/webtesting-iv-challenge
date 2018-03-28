const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Car = require('./models');

let carID;

describe('Server', () => {
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
          carID = res.body['_id'];
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
          expect(res.body[0].manufacturer).to.equal('Ferrari');
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
          expect(res.status).to.equal(200);
          console.log(res.body);
          expect(res.body.manufacturer).to.equal('McLaren');
        });
        done();
    });
  });
  // describe('[DELETE] /cars', () => {
  //   it('should delete a car', () => {
  //     chai.request(server)
  //       .delete('/cars')
  //       .end((err, res) => {
  //         if (err) console.error(err);
  //         expect(res.status).to.equal(200);
  //         expect(res).to.be.json;
  //         expect(res.body).to.have.property('REMOVED');
  //       });
  //   });
  // });
});