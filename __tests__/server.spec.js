const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
  describe('index route', () => {
    it('should 404', async () => {
      const expectedStatusCode = 404;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should respond with warning message ', async () => {
      const response = await request(server).get('/');
      expect(response.body).toEqual(expect.objectContaining({
        errorMessage: expect.stringMatching('You probably want to use a different endpoint')
      }));
    });
  });


  describe('create route', () => {
    it('should 400', async () => {
      const expectedStatusCode = 400;
      const response = await request(server).post('/create');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should respond with one object in an array', async () => {
      const response = await request(server).post('/create').send({ name: 'Manny', species: 'cat' });
      expect(response.body).toHaveLength(1);
    });
    it('should 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).post('/create').send({ name: 'Manny', species: 'cat' });
      expect(response.status).toEqual(expectedStatusCode);
    });
    
    it('should respond with updated pet list', async () => {
      const response = await request(server).post('/create').send({ name: 'Manny', species: 'cat' });
      expect(response.body).toEqual(expect.arrayContaining([{
        name: expect.stringMatching('Manny'),
        species: expect.stringMatching('cat')
      }]));
    });
  });
});