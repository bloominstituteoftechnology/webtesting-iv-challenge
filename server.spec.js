const request = require('supertest');

const server = require('./server');

describe('/', () => {
    it('should run server', async () => {
      const expected = { api: 'Server running!' };
  
      const response = await request(server).get('/');
  
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body).toEqual(expected);
      
    });
  });