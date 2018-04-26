const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server');
const Char = require('./charModel');

chai.use(chaiHTTP);

describe('Characters', () => {
  let charId;
  
  before(done => {
    mongoose.connect('mongodb://localhost/test', {}, err => {
      if (err) return console.log(err);
      console.log('Test DB power level is over 9000!!!');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  beforeEach((done) => {
    const newChar = new Char({
      name: 'Vegeta',
      race: 'Saiyan',
      planet: 'Vegeta'
    });

    newChar.save((err, savedChar) => {
      if (err) {
        console.log(err);
        done();
      }
      charId = savedChar._id;
      done();
    });
  });

  afterEach((done) => {
    Char.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[GET] /api/dbz-chars`, () => {
    it('should get a list of characters in the db', () => {
      return chai
              .request(server)
              .get('/api/dbz-chars')
              .then((res) => {
                expect(res.status).to.equal(200);
              });
        // check if its an array
        // check if 200
        // check body
        // check id
    });
  });

  describe(`[POST] /api/dbz-chars/add`, () => {
    it('should add a character to the list in the db', () => {
      return chai
              .request(server)
              .post('/api/dbz-chars/add')
              .send({ name: 'Goku', race: 'Saiyan', planet: 'Vegeta' })
              .then((res) => {
                expect(res.status).to.equal(200);
              });
    });
  });

  describe(`[PUT] /api/dbz-chars/name`, () => {
    it('should update a character on the db', () => {
      return chai
              .request(server)
              .put('/api/dbz-chars/Vegeta')
              .send({ race: 'Human', planet: 'Earth'})
              .then((res) => {
                expect(res.status).to.equal(200);
              });
    })
  });

});
