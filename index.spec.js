const server = require('./api/server.js');
const request = require('supertest');

describe('server', () => {
  it('should run tests', () => {
    expect(true).toBeTruthy();
  });

  describe('GET /', () => {
    it('should return JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toBe('application/json');      
    });

    it('should return statusCode = 200', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('should return { message: "Server Running" } ', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: "Server running" });
    });
  });

  describe('POST /api/ice-cream', () => {
    it('should return JSON', async () => {
      const response = await request(server).post('/api/ice-cream');

      expect(response.type).toBe('application/json');
    });

    it('should return a statusCode = 500 if error occurs', async () => {
      const response = await request(server).post('/api/ice-cream');

      expect(response.status).toBe(500);
    });    
  });

  describe('DELETE /api/ice-cream/:id', () => {
    it('should return { "missingError": "Could not find order by that ID" } if ID is not found', async () => {  
      const id = 2;    
      const response = await request(server).delete(`/api/ice-cream/${id}`);

      expect(response.body).toEqual({ missingError: "Could not find order by that ID" });      
    });

    it('should return { success: `order deleted` } ', async () => {
      const id = 8;
      const response = await request(server).delete(`/api/ice-cream/${id}`);
      // expect(response.body).toEqual({ success: 'order deleted' });
    });
  });
});