const mongoose = require('mongoose');

const server = require('./server');
const Show = require('./models');

const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHTTP);

describe('Server', () => {
   let showId = null;
   let testShow = null;

   before(done => {
      // mongoose.Promise = global.Promise;
      mongoose.connect('mongodb://localhost/testShow');
      const db = mongoose.connection;
      db.on('error', () => console.error.bind(console, 'connection error'));
      db.once('open', () => {
         console.log('we are connected');
         done();
      });
   });

   after(done => {
      mongoose.connection.close();
      if (mongoose.connection.readyState === 0) done();
      else console.error('error closing connection'), done();
      // mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done));
   });

   beforeEach(done => {
      const myShow = new Show({
         name: 'One Piece',
         year: 1999,
      });
      myShow
         .save()
         .then(show => {
            testShow = show;
            showId = String(show._id);
            done();
         })
         .catch(err => {
            console.error(err);
            done();
         });
   });

   afterEach(done => {
      Show.remove({}, err => {
         if (err) console.log(err);
         done();
      });
   });

   describe('[POST] /show', () => {
      it('should add a new show', done => {
         const newShow = {
            name: 'Shokugeki no Souma',
            year: 2014,
         };
         chai
            .request(server)
            .post('/show')
            .send(newShow)
            .end((err, res) => {
               if (err) {
                  console.error(err);
                  done();
               }
               expect(res.status).to.equal(200);
               expect(res.body.name).to.equal('Shokugeki no Souma');
            });
         done();
      });

      it('returns a status 422 upon receiving bad data', done => {
         const newShow = {
            name: 'Shokugeki no Souma',
            year: '2014',
         };
         chai
            .request(server)
            .post('/show')
            .send(newShow)
            .end((err, res) => {
               if (err) {
                  expect(res.status).to.equal(422);
                  console.log('err is', err);
                  const { error } = err.response.body;
                  expect(error).to.equal('invalid input error');
               } else console.log('error not occuring as it should');
               done();
            });
      });
   });

   describe('[GET] /show', () => {
      it('should get the show info for one show', done => {
         chai
            .request(server)
            .get('/show')
            .send(testShow)
            .end((err, res) => {
               if (err) {
                  console.error(err);
                  done();
               }
               expect(res.status).to.equal(200);
               expect(res.body[0].name).to.equal('One Piece');
            });
         done();
      });
   });

   describe('[GET] /shows', () => {
      it('should get all the shows', done => {
         chai
            .request(server)
            .get('/shows')
            .end((err, res) => {
               if (err) {
                  console.error(err);
                  done();
               }
               expect(res.status).to.equal(200);
               expect(res.body[0].name).to.equal(testShow.name);
               expect(res.body[0]._id).to.equal(showId);
            });
         done();
      });
   });

   describe('[PUT] /show', () => {
      it('should update a document given an id and some text', done => {
         const showUpdate = {
            id: showId,
            name: 'One Piece: The Red Line',
         };
         chai
            .request(server)
            .put('/show')
            .send(showUpdate)
            .end((err, res) => {
               if (err) {
                  throw new Error(err);
                  done();
               }
               expect(res.body.name).to.equal(showUpdate.name);
               done();
            });
      });

      it('should handle error if bad id sent', done => {
         const showUpdate = {
            id: 'wrongOne',
            name: 'One Piece: The Red Line',
         };
         chai
            .request(server)
            .put('/show')
            .send(showUpdate)
            .end((err, res) => {
               if (err) {
                  expect(err.status).to.equal(422);
                  const { error } = err.response.body;
                  expect(error).to.equal('Show not found by that Id');
               }
               done();
            });
      });
   });
});
