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
      .connect('mongodb://localhost/testingMini', {})
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
      name: 'agent',
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

  // describe(` [PUT] /api/battlefield`, () => {
  //   it('should be able to put request', done => {
  //     chai
  //       .request(server)
  //       .put('/api/battlefield')
  //       .end((error, response) => {
  //         if (error) {
  //           console.log(error);
  //           // expect(response.status).to.equal(200);
  //           return done();
  //         }
  //         expect(response.status).to.equal(404);
  //         return done();
  //       });
  //   });
  // });

  //   describe(` [POST] /api/battlefield`, () => {
  //     it('should able to make a post request', done => {
  //       const battlefield = {
  //         name: 'agent',
  //         kills: '123',
  //         deaths: '1'
  //       };
  //       chai
  //         .request(server)
  //         .post('/api/battlefield')
  //         .send(battlefield)
  //         .end((error, response) => {
  //           if (error) {
  //             console.log(error);
  //             return done();
  //           }
  //           return done();
  //         });
  //     });
  //   });

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
});
