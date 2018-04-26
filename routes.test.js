// import { mongo } from 'mongoose';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = require('chai').expect;
const should = chai.should();

mongoose.connect('mongodb://localhost/test', {}, err => {
    if(err) return console.log(err);
});

const server = require('./server');
const Band = require('./band');

chai.use(chaiHTTP);

describe(`[GET] /api/bands`, () => {
    it('should get a list of all the bands in db', done => {
      chai
        .request(server)
        .get('/api/bands')
        .end((err, response) => {
          if (err) {
            // assert that err should be type status etc.
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          return done();
        });
      // check if its an array
      // check if 200
      // check body
      // check id
    });
  });

  describe('[POST] /api/bands', () => {
      it('should add a new band to the db', done => {
          chai
            .request(server)
            .post('/api/bands')
            .type('json')
            .send({
                '_method': 'put',
                'name': 'Dillinger Escape Plan',
                'genre': 'Mathcore'
            })
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                expect(response.status).to.equal(200);
                // console.log(response.body);
                return done();
            });
      });
  });

  // describe('[DEL] /api/bands', () => {
  //     it('should add a new band to the db', done => {
  //         chai
  //           .request(server)
  //           .post('/api/bands')
  //           .type('json')
  //           .send({
  //               '_method': 'put',
  //               'name': 'Dillinger Escape Plan',
  //               'genre': 'Mathcore'
  //           })
  //           console.log()
  //           .request(server)
  //           // .delete(`/band/${response.body.id}`)
  //           .delete(`/band/${band.id}`)
  //           .end((err, response) => {
  //               if(err) {
  //                   console.log('err log', err);
  //                   return done();
  //               }
  //               expect(response.status).to.equal(200);
  //               console.log('succ log', response.body);
  //               return done();
  //           });

  //     });
  // });

// //   describe()

describe('[PUT] /api/band/:id', () => {
  it('should delete a band from the db', done => {
    let band = new Band({name: "The Dillinger Escape Plan", genre: "Mathcore"})
      band.save((err, band) => {
        chai.request(server)
        .put('/api/band/' + band._id)
        // .delete(`/band/${band._id}`)
        .send({name: 'Dillinger Escape Plan', genre:"MoreLikeNerdcore"})
        .end((err, res) => {
            res.should.have.status(200);
            
            // done();
            
        done();
        });

      })
  })
})

  describe('[DELETE] /api/band/:id', () => {
      it('should delete a band from the db', done => {
        const band = new Band({name: "The Dillinger Escape Plan", genre: "Mathcore"})
          band.save((err, band) => {
            chai.request(server)
            .delete('/api/band/' + band._id)
            .end((err, res) => {
                res.should.have.status(200);
                // done();
                done();
            });

            
          })
      })
  })

  // describe(`[DELETE] /bands/:id`, () => {
  //   it('should delete a band at the provided Id', done => {
  //     const band = new Band({ name: 'Dave Brubeck', genre: 'Jazz' });
  //     band.save((err, book) => {
  //       chai
  //         .request(server)
  //         .delete('/bands/' + band._id)
  //         .end((err, response) => {
  //           expect(response.status).to.equal(200);
  //           done();
  //         });
  //     });
  //   });
  // });




