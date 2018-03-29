const mongoose = require('mongoose');
mongoose.connect('mongod://localhost/shows');

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
      mongoose.connect('mongodb://localhost/shows');
      const db = mongoose.connection;
      db.on('error', () => {
         console.error('connection error');
         done();
      });
      db.once('open', () => {
         console.log('we are connected');
         done();
      });
   });

   after(done => {
      mongoose.connection.close();
      if (mongoose.connection.readyState === 0) done();
      else console.error('error closing connection'), done();
   });

   // beforeEach((done) => {
   //    const myShow = new Show({
   //       name: 'One Piece',
   //       year: 1999
   //    });
   //    myShow.save().then(show => {
   //       testShow = show;
   //       showId = show._id;
   //       done();
   //    }).catch(err => {
   //       console.error(err);
   //       done();
   //    });
   // })

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
   });

   describe('[GET] /show', () => {
      it('should get the show info for one show', done => {
         const newShow = {
            name: 'Shokugeki no Souma',
            year: 2014,
         };
         chai
            .request(server)
            .get('/show')
            .send(newShow)
            .end((err, res) => {
               if (err) {
                  console.error(err);
                  done();
               }
               expect(res.status).to.equal(200);
               expect(res.body[0]).to.equal({
                  name: 'Shokugeki no Souma',
                  year: 2014,
               });
            });
      });

      it('returns a status 422 upon receiving bad data', done => {
         const newShow = {
            year: 2012,
         };
         chai
            .request(server)
            .post('/show')
            .send(newShow)
            .end((err, res) => {
               expect(res.status).to.equal(422);
               console.log(err);
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

   // describe('getShowInfo', () => {
   //    it('should return the expected show name', () => {
   //       const show = new Show({
   //          name: 'Black Mirror',
   //          year: 2015,
   //       });
   //       expect(show.getShowInfo()).to.equal.apply({
   //          name: 'Black Mirror',
   //          year: 2015,
   //       });
   //    });
   // });

   // describe('getAllShows', () => {
   //    it('should return all the shows', () => {
   //       sinon.stub(Show, 'find');
   //       Show.find.yields(null, [
   //          { name: 'Black Mirror', year: 2015 },
   //          { name: 'Brooklyn Nine-Nine', year: 2013 },
   //       ]);
   //       Show.getAllShows(shows => {
   //          expect(shows.length).to.equal(2);
   //          expect(shows[1].name).to.equal('Brooklyn Nine-Nine');
   //       });
   //    });
   // });
});
