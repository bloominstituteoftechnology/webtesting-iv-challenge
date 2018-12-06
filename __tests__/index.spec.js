const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })
  })
})