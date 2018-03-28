const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

chai.use(chaihttp);

const server = require('./server');

const Record = require('./models');

describe('Server', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error');
    });
    db.once('open', () => {
      console.log('connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('POST to /records', () => {
    it('should add a new record', (done) => {
      const newRecord = {
        artistName: 'The Beatles',
        name: "Sgt. Pepper's Lonely Hearts Club Band",
        type: 'LP',
      };
      chai.request(server)
        .post('/records')
        .send(newRecord)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          console.log(res);
          expect(res.body.artistName).to.equal(
            "The Beatles"
          );
        });
      done();
    });
  });
  // describe('GET to /records', () => {
  //   it('should return all records', () => {

  //   })
  // })
});
