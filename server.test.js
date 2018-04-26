const chai = require('chai');
const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server.js');
const Band = require('./band.js');

chai.use(chaiHTTP);


mongoose.connect('mongodb://localhost/test', {}, () => {
  console.log('Mongo Successfully Connected');
});

describe('Bands', () => {

  let bandID;
  beforeEach(done => {
    const newBand = new Band({
      bandName: 'Glass Animals',
      genre: 'Alt'
    });

    newBand.save((err, response) => {
      if (err) {
        console.log('ERROR: ', err);
        done();
      } else {
        bandID = newBand.id
        done();
      }
    });

  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) {
        console.log('Remove ERROR: ', err);
      }
      return done();
    });
  });

  describe('GET/api/bands', () => {

    it('should return a list of all bands stored in the DB', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, response) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
    });
  });
    describe(`[POST] /api/bands`, () => {
        it('should post a band in the database', done => {
        const band = new Band({
            bandName: 'The Black Keys',
            genre: 'Rock'
        });
          chai
            .request(server)
            .post('/api/bands')
            .send(band)
            .end((err, response) => {
              if (err) {
                console.log(err);
                return done();
              }
              expect(response.status).to.equal(200);
              return done();
            });
        });
      });
    
      describe(`[PUT] /api/bands/:id`, () => {
        it('Should update the band given an ID', done => {
          let update = {
            bandName: 'Jet'
          };
          chai
            .request(server)
            .put('/api/bands/' + `${bandID}`)
            .send(update)
            .end((err, response) => {
              if (err) {
                console.log(err);
                done();
              }
              expect(response.status).to.equal(200);
              done();
        });
        });
      });
    
        describe(`[DELETE] /api/bands/:id`, () => {
            it('Should delete the band given the ID', done => {
              let band = new Band({
                name: 'adfs',
                genre: 'adf'
              });
              band.save((err, band) => {
                chai
                  .request(server)
                  .delete('/api/bands/' + `${bandID}`)
                  .end((err, response) => {
                    if (err) {
                      console.log(err);
                      done();
                    }
                    expect(response.status).to.equal(200);
                    done();
                  });
              });
            });
          });
});
        