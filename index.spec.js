const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  describe('GET /', () => {
    
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');
  
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });

    it('should return { message: "Server check" }', async  () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: 'Server check' });
    })
  });
  
  describe('POST /', () => {

    it('should return correct status code', async () => {
      //return correct status code
    })

    it('should return JSON', async () => {
      //return JSON
    })

    it('should return the created resource', async () => {
      //return resource
    })
  })

  describe('DELETE /', () => {
    it('should return correct status code', async () => {
      //return correct status code
    })

    it('should return number of deleted items', async () => {
      //return number
    })
  })
});