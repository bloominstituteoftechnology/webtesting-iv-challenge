const request = require('supertest');

const server = require('./server');

describe('/', () => {
    it('should run server', async () => {
      const expected = { api: 'Server running!' };
  
      const actual = await request(server).get('/');
  
      expect(actual.status).toEqual(200);
      expect(actual.type).toEqual('application/json');
      expect(actual.body).toEqual(expected);
    });
  });