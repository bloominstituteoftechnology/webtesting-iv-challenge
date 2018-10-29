const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
 describe('GET /', () => {
    it('should respond with status of 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
});

describe('GET /club', () => {
    it('should respond with status of 200', async () => {
      const response = await request(server).get('/club');
      expect(response.status).toBe(200);
    });
    it('should respond with json', async () => {
      const response = await request(server).get('/club');
      expect(response.type).toBe('application/json');
    });
    it('should respond with sports club object', async () => {
      const response = await request(server).get('/club');
      const expectedBody = [
        { id: 0, name: 'Manchester United' },
        { id: 1, name: 'Chelsea FC' }
      ];
      expect(response.body).toEqual(expectedBody);
    });
  });
  describe('POST /club', () => {
    it('should add sports club to club object', async () => {
      const response = await request(server)
        .post('/club')
        .send({
          name: 'Arsenal FC'
        });
      const expectedBody = [
        { id: 0, name: 'Manchester United' },
        { id: 1, name: 'Chelsea FC' },
        { id: 2, name: 'Arsenal FC' }
      ];
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expectedBody);
    });
  });
  describe('DELETE /club/:id', () => {
    it('should delete club with passed id', async () => {
      const response = await request(server).delete('/club/2');
      const expectedBody = [
        { id: 0, name: 'Manchester United' }, 
        { id: 1, name: 'Chelsea FC' }
      ];
      expect(response.body).toEqual({expectedBody});
    });
    it('should return 404 when passed id does not exist', async () => {
      const response = await request(server).delete('/club/10000');
      expect(response.status).toBe(404);
    });
  });

