
// configure environment for node
// verify status code
// verify body contents
// verify it returns JSON

const request = require('supertest');
const server = require('./server');


describe('server.js', () => {
  it('runs tests', () => {
    expect(true).toBeTruthy();
  });

  describe('GET for /', () => {
    it('returns 200', async () => {
      // get access to the server
      // use supertest to make GET to server
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
    
    it('should return {api: "running"}', async () => {
      const expectedBody = {api: 'running'}
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    });
    
    it('should return JSON', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('GET for /users', () => {
    it('returns 200', async () => {
      const response = await request(server).get('/users');
      expect(response.status).toBe(200);
    });
    
    it('should return Users Object', async () => {
      const response = await request(server).get('/users');
      expect(response.body).toEqual([
        {name: 'jack'},
        {name: 'mack'}
      ]);
    });
    
    it('should return JSON', async () => {
      const response = await request(server).get('/users');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST for /users', () => {
    it('returns 200', async () => {
      const response = await request(server).post('/users')
        .send({name: 'testtt'});
      expect(response.status).toBe(200);
    });
    
    it('should return Array with ID', async () => {

      const response = await request(server).post('/users')
      .send({name: 'test'});
      expect(response.body).toEqual([3]);
    });
    
    it('should return JSON', async () => {
      const response = await request(server).post('/users')
      .send({name: 'test'});
      expect(response.type).toEqual('application/json');
    });
  });

  describe('DEL for /users', () => {
    it('returns 200', async () => {
      const response = await request(server).delete('/users/2');
      expect(response.status).toBe(200);
    });
    
    it('should return 0', async () => {
      const response = await request(server).delete('/users/2');
      expect(response.body).toBe(0);
    });
    
    it('should return JSON', async () => {
      const response = await request(server).delete('/users/2');
      expect(response.type).toEqual('application/json');
    });
  });

});
