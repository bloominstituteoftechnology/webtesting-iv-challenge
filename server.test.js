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
      console.log('db connected');
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
        albumName: "Sgt. Pepper's Lonely Hearts Club Band",
        recordType: 'LP',
      };
      chai
        .request('localhost:3030/records')
        .post('/records')
        .send(newRecord)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.artistName).to.equal('The Beatles');
        });
      done();
    });
  });
  describe('GET to /records', () => {
    it('should return all records', (done) => {
      const newRecord1 = {
        artistName: 'The Beatles',
        albumName: "Sgt. Pepper's Lonely Hearts Club Band",
        recordType: 'LP',
      };
      const newRecord2 = {
        artistName: 'The Beatles',
        albumName: 'The White Album',
        recordType: 'LP',
      };
      const newRecord3 = {
        artistName: 'The Beatles',
        albumName: 'Something Else',
        recordType: 'LP',
      };
      // const poster = chai.request('localhost:3030/records').keepOpen();
      // Promise.all([
      //   poster.post('/records').send(newRecord1),
      //   poster.post('/records').send(newRecord2),
      //   poster.post('/records').send(newRecord3).then(res =>console.log(res.body)),
      // ]).then(() => {
        chai.request('localhost:3030/records')
          .get('/records').end((err, res) => {
            console.log('get response', res);
            if (err) {
              console.error(err);
              done();
            }
          expect(res.status).to.equal(200);
          expect(res.body[0].artistName).to.equal('The Beatles');
        });
        done();
      // });
    });
  });
});
