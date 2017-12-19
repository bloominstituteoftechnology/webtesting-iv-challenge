const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/food-test', {useMongoClient: true});

const server = require('./server');
const Character = require('./characters');


describe(`character model`, () => {
  describe(`[GET] '/character-info/:id'`, (done) => {
    it('should return an object that includes name and hair color', () => {
      chai.request(server)
        .get('/character-info/1')
        .end((err, response) => {
          expect(response.body.name).to.be.a('string');
          expect(response.body.name).to.equal('Luke Skywalker');
          expect(response.body.hair_color).to.be.a('string');
          expect(response.body.hair_color).to.equal('blond');
          done();
        });
    });
  });

  describe(`[POST] /character`, (done) => {
    it("should create a new character in the db if it isn't already there", () => {
      chai.request(server)
        .post('character-info', {id: 1})
        .end((err, response) => {
          Character.findOne({where: {name: "Luke Skywalker" } })
          .then(charac => {
            expect(response.body.name).to.be.a('string');
            expect(response.body.name).to.equal('Luke Skywalker');
            expect(response.body.hair_color).to.be.a('string');
            expect(response.body.hair_color).to.equal('blond');
            expect(response.status).to.equal(201);
            expect(charac.name).to.equal(response.body.name);
            done();
          });
        });
    });
  });
});