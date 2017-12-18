const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/star-wars-test', {useMongoClient: true});

const server = require('./server');
const Character = require('./characters');


describe(`character model`, () => {
  beforeEach("add Luke with the force", () => {
    Character.create({
      name: "Luke Skywalker",
      haircolor: "blond"
    });
  })

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

  describe(`[POST] '/character'`, (done) => {
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
            expect(response.status).to.equal(302);
            expect(charac.name).to.equal(response.body.name);
            done();
          });
        });
    });
  });

  describe(`[PUT] '/change-charater-haircolor'`, (done) => {
    it('should update the characters hair color', () => {
      chai.request(server)
        .put('/change-charater-haircolor', "", {query: { newHairColor: 'red' } })
        .end((err, response) => {
          Character.findOne({where: {name: "Luke Skywalker" } })
            .then(charac => {
              expect(response.body.name).to.be.a('string');
              expect(response.body.name).to.equal('Luke Skywalker');
              expect(response.body.hair_color).to.be.a('string');
              expect(response.body.hair_color).to.equal('red');
              expect(response.status).to.equal(205);
              expect(charac.haircolor).to.equal(response.body.hair_color);
              done()
            });
        });
    });
  });

  describe(`[DELETE] '/character/:name'`, (done) => {
    it('should delete a character from our db', () => {
      chai.request(server)
        .delete('/character/Luke Skywalker')
        .end((err, response) => {
          Character.findOne({where: {name: "Luke Skywalker" } })
            .then(luke => {
              if (luke) {
                expect(luke.name).to.equal("Luke Skywalker");
                expect(response.status).to.equal(422);
                done();
              } else {
                expect(luke).to.equal(null);
                expect(response.status).to.equal(204);
                done();
              }
            });
        });
    });
  });
});
