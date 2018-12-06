const request = require('supertest');
const server = require('./api/server.js');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);


beforeEach(async () => {
  await db('names').truncate();
});


describe('server.js', () => {
  describe('/ route', () => {
    it('should return status 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });
  
    it('should return with a body like: ** server up on port xxxx **', async () => {
      let response = await request(server).get('/');
      expect(response.body).toEqual({ api: 'up' });

    });

  });


  describe('POST / endpoint', () => {


    it('should fail with status 500', async () => {
      let response = await request(server)
        .post('/')
        .send();
      expect(response.status).toBe(500);
    });
  
    it('should respond with status 201 if successful', async () => {
      let response = await request(server)
        .post('/')
        .send({ name: 'steve' });
      expect(response.status).toBe(201);
    });

    it('should return JSON', async () => {
      let response = await request(server)
        .post('/')
        .send({ name: 'steve' });
      expect(response.type).toBe('application/json');
    });

    it('should return with the index of the new entry', async () => {
      let response = await request(server)
        .post('/')
        .send({ name: 'steve' });
      expect(response.body).toEqual([1]);
    });
  });



});