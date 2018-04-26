const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('TEST DB Connection Achieved');
});

const expect = chai.expect;
// const assert = chai.assert;
const server = require('./server');
const Band = require('./band');

chai.use(chaiHTTP);

describe('Bands', () => {
  let bandId;
  beforeEach(done => {
    const newBand = new Band({
      name: 'Radiohead',
      genre: 'Alternative Rock',
      album: 'In Rainbows',
    });
    newBand.save((err, savedBand) => {
      if (err) {
        console.log(err);
        done();
      }
      bandId = savedBand._id;
      done();
    });
  });

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // describe(`[POST] /api/bands`, () => {
  //   it('should post a new band to the database', done => {
  //     chai
  //       .request(server)
  //       .post('api/bands')
  //       .end((err, res) => {
  //         if (err) {
  //           expect(res.status).to.equal(500);
  //           console.log(err);
  //           return done();
  //         }
  //         expect(res.status).to.equal(201);
  //         console.log(res);
  //         return done();
  //       });
  //   });
  // });

  // describe(`[GET] /api/bands`, () => {
  //   it('should get a list of all bands from the db', done => {
  //     chai
  //       .request(server)
  //       .get('/api/bands')
  //       .end((err, res) => {
  //         if (err) {
  //           expect(res.status).to.equal(500);
  //           console.log(err);
  //           return done();
  //         }
  //         expect(res.status).to.equal(200);
  //         expect(res.body).to.be.lengthOf(3);
  //         console.log(res);
  //         return done();
  //       });
  //   });
  // });

  // describe(`[GET] /api/bands/:id`, () => {
  //   it('should get a band from the db', done => {
  //     chai
  //       .request(server)
  //       .get('api/bands/:id')
  //       .end((err, res) => {
  //         if (err) {
  //           expect(res.status).to.equal(500);
  //           console.log(err);
  //           return done();
  //         }
  //         expect(res.status).to.equal(200);
  //         expect(res._id).to.equal(bandId);
  //         console.log(res);
  //         return done();
  //       });
  //   });
  // });
});
