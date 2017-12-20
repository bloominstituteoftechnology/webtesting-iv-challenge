const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Movie = require('./movie');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

describe('Movie', () => {
  describe('getTitle()', () => {
    it(`should return 'the title of the given movie'`, () => {
      const movie = new Movie({
        title: 'Who am I'
      });
      expect(movie.getTitle()).to.equal('Who am I');
    });
  });

  describe('getAllMovie()', () => {
    it(`should pass a list of created movies`, () => {
      sinon.stub(Movie, 'find');
      Movie.find.yields(null, [{ title: 'Titanic' }, { title: 'Rambo' }]);
      Movie.getAllMovie(movies => {
        expect(movies.length).to.equal(2);
        Movie.find.restore();
      });
    });
  });
});
