const Anime = require('./model');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Anime', () => {
  describe('#getName()', () => {
    it('should return the name of the anime', () => {
      const anime = new Anime({
        name: 'DragonballZ',
        genre: 'Action'
      });
      expect(anime.getName()).to.equal('DragonballZ');
    });

    it('should return a string', () => {
      const anime = new Anime({
        name: 'JoJo\'s Bizarre Adventure',
        genre: 'I have no idea'
      });
      expect(typeof anime.getName()).to.equal('string');
    });
  });

  describe('#getAllAnimes()', () => {
    it('should return all the anime in the database', () => {
      sinon.stub(Anime, 'find');      
      Anime.find.yields(null, [{ name: 'Akira'}]);
      Anime.getAllAnimes((anime) => {
        expect(anime.length).to.equal(1);
        expect(anime[0].name).to.equal('Akira');
        Anime.find.restore();
      });
    });
  });
});
