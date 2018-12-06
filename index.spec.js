const request = require('supertest');
const server = require('./api/server.js');
const port = process.env.PORT || 9000;


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
    beforeEach(() => {
      db('names').truncate();
    });

    it('should fail with status 500', async () => {
      let response = await request(server)
        .post('/')
        .send();
      expect(response.status).toBe(500);
    });
  
    it('should respond with status 201 if successful', async () => {
      let response = await request(server)
        .post('/')
        .send({ name: steve });
      expect(response.status).toBe(201);
    });

    it('should return JSON', async () => {
      let response = await request(server)
        .post('/')
        .send({ name: steve });
      expect(response.type).toBe('application/json');
    });

    it('should return with the index of the new entry', async () => {
      let response = await request(server)
        .post('/')
        .send({ name: 'steve' });
      expect(response.body).toEqual({ id: 1 });
    });
  });

  describe('DELETE /:id endpoint', () => {
    beforeEach(() => {
      db('names').truncate();
      db('names').insert({ name: 'steve'});
    });

    it('should fail with status 500', async () => {
      let response = await request(server).delete('/5')
      expect(response.status).toBe(500);

    });

    it('should respond with status 200 if successful', async () => {
      let response = await request(server).delete('/1')
      expect(response.status).toBe(200);

    });  

    it('should respond with the number of records deleted', async () => {
      let response = await request(server).delete('/1')
      expect(response.body).toEqual( 1 );
    })
  })
  

});