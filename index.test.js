const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
// const Painter = require('/painterModels');
chai.use(chaiHttp);
const server = require('./index');

describe('Index', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/testPainters');
    const dbase = mongoose.connection;
    dbase.on('error', () => {
      console.error('connection error');
      done();
    });
    dbase.once('open', () => {
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('[POST] /painter', () => {
    it('should add a new painter', (done) => {
      const newPainter = {
        name: 'van Gogh',
        style: 'Post-Impressionism'
      };
      chai.request(server)
      .post('/painter')
      .send(newPainter)
      .end((err, res) => {
        //console.log("first log", res.body);
        if (err) {
          console.error(err);
          done();
        };
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('van Gogh');
      });
      done();
    });
  });

  describe('[GET] /allPainters', () => {
    it("should return all the painters", (done) => {
      chai.request(server)
      .get("/allPainters")
      .end((err, res) => {
        // console.log("log", res.body);
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body[0].name).to.equal("Franz Kline");
      });
      done();
    });
  });
});