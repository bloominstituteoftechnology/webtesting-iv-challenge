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
    it('should 400 if no body', async () => {
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

  describe('delete route', () => {
    it('should 400 if no body', async () => {
      const expectedStatusCode = 400;
      const response = await request(server).delete('/delete');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should respond with success', async () => {
      const response = await request(server).post('/create').send({ name: 'Manny', species: 'cat' });
        const response2 = await request(server).delete('/delete').send({id:0 });
      
      expect(response2.body).toEqual({message: 'Delete Success'});
    });
    it('should 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).post('/create').send({ name: 'Manny', species: 'cat' });
        const response2 = await request(server).delete('/delete').send({id:0 });
      
      expect(response2.status).toEqual(expectedStatusCode);
    });
    
   
  });
});