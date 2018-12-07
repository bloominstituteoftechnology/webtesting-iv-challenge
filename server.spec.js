const request = require('supertest');
const server = require('./server.js');
const db = require('./data/dbConfig');

beforeEach(async () => {
  await db('artists').truncate();
});

describe('server.js', () => {
  describe('/artists route', () => {
    describe('GET', () => {
      it('should return a status code of 200', async () => {
        await db.seed.run();
        let response = await request(server).get('/artists');
        expect(response.status).toBe(200);
      });
      it('should return JSON', async () => {
        let response = await request(server).get('/artists');
        expect(response.type).toBe('application/json');
      });
      it('should return an array', async () => {
        let response = await request(server).get('/artists');
        expect(Array.isArray(response.body)).toBe(true);
      });
    });
    describe('POST', () => {
      it('should return a new artist', async () => {
        await db.seed.run();
        let response = await request(server)
          .post('/artists')
          .send({ name: 'Mitski' });
        expect(response.body).toEqual({ id: 6, name: 'Mitski' });
      });
      it('should return a status of 201', async () => {
        let response = await request(server).post('/artists');
        expect(response.status).toBe(201);
      });
    });
    describe('DELETE', () => {
      it('should delete an artist from the array', async () => {
        await db.seed.run();
        let response = await request(server)
          .delete('/artists')
          .send({ name: 'Mitski' });
        expect(response.body).toHaveLength(5);
        expect(response.status).toBe(200);
      });
    });
  });
});
