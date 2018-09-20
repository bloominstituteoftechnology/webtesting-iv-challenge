const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should respond with status of 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /phones', () => {
    it('should respond with status of 200', async () => {
      const response = await request(server).get('/phones');
      expect(response.status).toBe(200);
    });
    it('should respond with json', async () => {
      const response = await request(server).get('/phones');
      expect(response.type).toBe('application/json');
    });
    it('should respond with phones object', async () => {
      const response = await request(server).get('/phones');
      const expectedBody = [
        { id: 0, name: 'iPhone' },
        { id: 1, name: 'Samsung S9' }
      ];
      expect(response.body).toEqual(expectedBody);
    });
  });
  describe('POST /phones', () => {
    it('should add phone to phones object', async () => {
      const response = await request(server)
        .post('/phones')
        .send({
          name: 'Pocophone'
        });
      const expectedBody = [
        { id: 0, name: 'iPhone' },
        { id: 1, name: 'Samsung S9' },
        { id: 2, name: 'Pocophone' }
      ];
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expectedBody);
    });
  });
  describe('DELETE /phones/:id', () => {
    it('should delete phone with passed id', async () => {
      const response = await request(server).delete('/phones/2');
      const expectedBody = [
        { id: 0, name: 'iPhone' },
        { id: 1, name: 'Samsung S9' }
      ];
      expect(response.body).toEqual(expectedBody);
    });
    it('should return 404 when passed id does not exist', async () => {
      const response = await request(server).delete('/phones/20101');
      expect(response.status).toBe(404);
    });
  });
});
