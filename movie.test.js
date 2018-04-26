const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const Movie = require('./movie');

const expect = chai.expect;

describe('Movie', () => {
  let movieId;
  before(done => {
    mongoose.connect('mongodb://localhost/movies', {}, err => {
      if (err) return console.log(err);
      console.log('TEST DB Connection Achieved');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  // describe('getMovie', () => {
  //   it('should return the title of the movie', done => {
  //     const movie = new Movie({ title: 'Shark Tales', genre: 'Animation' });
  //     expect(movie.getTitle()).to.equal('Shark Tales');
  //     return done();
  //   });
  // });
});