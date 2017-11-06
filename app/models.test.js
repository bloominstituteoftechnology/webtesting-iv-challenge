const mongoose = require('mongoose');
const VideoGame = require('./models');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

describe('VideoGame', () => {
  beforeEach((done) => {
    sinon.stub(VideoGame, 'find');
    done();
  });

  afterEach((done) => {
    VideoGame.find.restore();
    done();
  });

  describe('#getTitle()', () => {
    it('should return the title of the game', (done) => {
      const game = new VideoGame({
        "title" : "Portal 2",
        "developer" : "Vavle",
        "yearReleased" : 2012
      });
      expect(game.getTitle()).to.equal('Portal 2');
      done();
    });
  });

  describe('#getGames()', () => {
    it('should return all of the games', (done) => {
      const game1 = new VideoGame({
        "title" : "Portal 2",
        "developer" : "Vavle",
        "yearReleased" : 2012
      });
      const game2 = new VideoGame({
        "title" : "Witcher 3",
        "developer" : "CD Projekt Red",
        "yearReleased" : 2015
      });
      VideoGame.find.yields([game1, game2]);
      VideoGame.getGames((games) => {
        expect(games).to.be.an('array');        
        expect(games.length).to.equal(2);
        done();
      });
    });
  });

  describe('#findByDeveloper()', () => {
    it('should return all of the games of the specified developer', (done) => {
      const game = new VideoGame({
        "title" : "Portal 2",
        "developer" : "Valve",
        "yearReleased" : 2012
      });
      VideoGame.find.yields(game);
      VideoGame.findByDeveloper('Valve', (game) => {
        expect(game).to.be.an('object');        
        expect(game.developer).to.equal('Valve');
        done(); 
      });     
    });
  });
});