const request = require('supertest');

const db = require('./data/dbConfig.js');

const names = require('./data/namesModal.js');

const server = require('./server.js');

beforeEach(async () => {
    await db('names').truncate();
  });

describe('server.js', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });

    it('should return with a body like: { api: "alive" }', async () => {
      let response = await request(server).get('/');

      expect(response.body).toEqual({ api: 'alive' });
    });
  });

  describe('create user', () => {
    it('should insert provided name', async () => {
        let rows = await db('names').where({ name: 'sam' });
        expect(rows).toHaveLength(0);

        await names.insert({ name: 'sam' });
        await names.insert({ name: 'frodo' });

        rows = await db('names').where({ name: 'sam' });
        expect(rows).toHaveLength(1);

        rows = await db('names');
        expect(rows).toHaveLength(2);
    });
  });

  describe('delete user', () => {
    it('should return status code 200', async () => {
    
    });
  });
});
