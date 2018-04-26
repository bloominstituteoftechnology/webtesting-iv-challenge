const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server');
const Battlefield = require('./battlefield');

chai.use(chaiHTTP);

describe('Battlefield', () => {
  let battlefieldId;

  before(done => {
    mongoose
      .connect('mongodb://localhost/ashdhhfhfjsjjdjfkfjfjjfjfjfjsjskksjfkksjfj', {})
      .then(() => console.log('\n=== connected to mongo ===\n'))
      .catch(error => console.log('There was an error connecting to mongo.'));
    return done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  beforeEach(done => {
    const newBattlefield = new Battlefield({
      name: 'agentt732',
      kills: '100',
      deaths: '1'
    });

    newBattlefield.save((error, savedBF) => {
      if (error) {
        console.log(error);
        return done();
      }
    });

    const newBF = new Battlefield({
      name: 'agent12',
      kills: '100',
      deaths: '1'
    });

    newBF.save((error, savedBF) => {
      if (error) {
        console.log(error);
        return done();
      }

      battlefieldId = savedBF._id;
      return done();
    });
  });
  afterEach(done => {
    Battlefield.remove({}, error => {
      if (error) console.log(error);
      return done();
    });
  });
  describe(` [GET] /api/battlefield`, () => {
    it('should get a list of battlefield users', done => {
      chai
        .request(server)
        .get('/api/battlefield')
        .end((error, response) => {
          console.log(error);

          expect(Array.isArray(response.body)).to.equal(true);

          expect(response.status).to.equal(200);
          return done();
        });
    });
  });

  describe(` [PUT] /api/battlefield`, () => {
    it('should be able to put request', done => {
      let battleId = battlefieldId;
      const integral = {
        id: battleId,
        name: 'sudo',
        kills: '1000',
        deaths: '20'
      };
      chai
        .request(server)
        .put('/api/battlefield/')
        .send(integral)
        .end((error, response) => {
          if (error) {
            console.log(error);
            // expect(response.status).to.equal(200);
            return done();
          }
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('sudo');
          expect(response.body.kills).to.equal('1000');
          expect(response.body.deaths).to.equal('20');

          return done();
        });
    });
  });

  describe('/POST battlefield', () => {
    it('it should POST ', done => {
      const battlefield = {
        name: 'b',
        kills: '12345',
        deaths: '12'
      };
      chai
        .request(server)
        .post('/api/battlefield')
        .send(battlefield)
        .end((err, res) => {
          // console.log(res);
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal('object');
          expect(res.body.name).to.equal('b');
          //res.body.should.have.property('errors');
          //expect(res.body.name).to.have.json( 'b' );

          //res.body.errors.should.have.property('pages');
          //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  describe(` [DELETE] /api/battlefield`, () => {
    it('should be able to delete ', done => {
      let battleId = battlefieldId;
      chai
        .request(server)
        .delete(`/api/battlefield/${battleId}`)
        .end((error, response) => {
          if (error) {
            console.log(error);
            // expect(response.status).to.equal(200);
             done();
          }
          expect(response.status).to.equal(200);
          // expect(response.body.name).to.equal('sudo');
          // expect(response.body.kills).to.equal('1000');
          // expect(response.body.deaths).to.equal('20');
          Battlefield.findById(battleId, (error, user) => {
            if (error) {
              console.log(error);
              done();
            }
            expect(user).to.equal(null);
            done();
          });
          //done();
        });
    });
  });
});
