const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const Anime = require('./model');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Anime', () => {
  const neo = new Anime({ name : 'Neon Genesis Evangelion' });
  const trigun = new Anime({ name : 'Trigun' });
  const hxh = new Anime({ name : 'Hunter x Hunter' });

  describe('#getName()', () => {
    it('should return the name of the anime', () => {
      const anime = new Anime({
        name: 'Neon Genesis Evangelion',
        genre: 'Super Robot',
      });
      expect(anime.getName()).to.equal('Neon Genesis Evangelion');
    });
    it('should return a string', () => {
      const anime = new Anime({
        name: 'Bokurano',
      });
      expect(typeof anime.getName()).to.equal('string');
    });
  });

  describe('#getAllAnimes()', () => {
    it('should return all the animes', async function() {
      sinon.stub(Anime, 'find');
      Anime.find.resolves([hxh, trigun, neo]);
      const allAnimes = await Anime.getAllAnimes();
      expect(allAnimes.length).to.equal(3);
    });
  });
});