const db = require('../data/dbConfig.js');
const Avengers = require('./avengersModel.js');

describe('avengers model', () => {
  afterEach(async () => {
    await db('avengers').truncate();
  });

  describe('insert()', () => {
    it('should insert provided avenger', async () => {
      await Avengers.insert({ name: 'iron man' });

      const avengers = await db('avengers');

      expect(avengers).toHaveLength(1);
    });

    it('should insert provided avenger', async () => {
      let avenger = await Avengers.insert({ name: 'iron man' });
      expect(avenger.name).toBe('iron man');

      avenger = await Avengers.insert({ name: 'black widow' });
      expect(avenger.name).toBe('black widow');

      const avengers = await db('avengers');

      expect(avengers).toHaveLength(2);
    });
  });


  describe('findById()', () => {
    it('should insert provided avenger', async () => {
      await Avengers.findById({ name: 'iron man' });

      const avengers = await db('avengers');

      expect(avengers).toHaveLength(1);
    });
});
});