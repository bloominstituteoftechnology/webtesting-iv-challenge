const db = require('../data/dbConfig');
const artists = require('./Artist.js');

beforeEach(async () => {
  await db('artists').truncate();
});

describe('Artist model', () => {
  describe('getAll()', () => {
    it('should get all the artists from the db', async () => {
      let rows = await artists.getAll();
      expect(rows).toHaveLength(0);
      await db.seed.run();
      rows = await artists.getAll();
      expect(rows).toHaveLength(5);
    });
  });
  describe('insert(artist)', () => {
    it('should insert artist into artists table', async () => {
      let rows = await db('artists').where({ name: 'Mitski' });
      expect(rows).toHaveLength(0);
      await artists.insert({ name: 'Mitski' });
      rows = await db('artists').where({ name: 'Mitski' });
      expect(rows).toHaveLength(1);
    });
  });
  describe('delete(artist)', () => {
    it('should delete artist', async () => {
      await db.seed.run();
      let rows = await db('artists').where({ name: 'The Sidekicks' });
      expect(rows).toHaveLength(1);
      await artists.remove({ name: 'The Sidekicks' });
      rows = await db('artists').where({ name: 'The Sidekicks' });
      expect(rows).toHaveLength(0);
      rows = await artists.getAll();
      expect(rows).toHaveLength(4);
    });
  });
});
