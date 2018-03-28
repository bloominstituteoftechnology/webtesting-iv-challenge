const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

chai.use(chaihttp);

const server = require('./server');

const Record = require('./models');

describe('Server', () => {
  describe('POST to /records', () => {
    it('should add a new record', () => {
      const newRecord = {
        artistName: "The Beatles",
        name: "Sgt. Pepper's Lonely Hearts Club Band",
        type: 'LP',
      };
      chai
        .request(server)
        .post('/records')
        .send(newRecord)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(
            "Sgt. Pepper's Lonely Hearts Club Band"
          );
        });
    });
  });
});
