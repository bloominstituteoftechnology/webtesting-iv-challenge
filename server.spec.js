const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  it('runs the tests', () => {
    expect(true).not.toBeFalsy();
  });//end run test

  describe('GET /', () => {
    it('returns a 200 (ok) status code', async () => {
      const response = await request(server).get('/');

      expect(response.status).toEqual(200);
    });//end status test

    it('should return array of objects', () => {
      const response = await request(server).get('/');
      expect(response.body)
        .toEqual(expect.arrayContaining([expect.objectContaining({ id: 0, text: 'Example Text' })]))
    });//end get posts
  });//end get / tests

  describe('POST /', async () => {
    it('should return created object with status 201 if sent proper data', () => {
      const post = { text: 'Success' };
      const response = await request(server).post('/').send(post);

      const { id, text } = response.body;
      expect(response.status).toEqual(201);
      expect(text).toEqual('Success');
      expect(id).toBeGreaterThan(0);

    });//end success tests

    it('should return error if missing data', async () => {
      const post = { notText: 'Failure' };

      try{
        const response = await request(server).post('/').send(post);
      } catch (e) {
        expect(e).toEqual({
          error: 'Invalid data'
        });
        expect(e.status).toEqual(422);
      }

    });//end failure tests
  });//end post requests

  describe('DELETE /:id', async () => {
    it('should return id of deleted object on success', async () => {
      const post = { text: 'Post to delete' };
      const createRes = await request(server).post('/').send(post);
      const deleteRes = await request(server).delete(`/${createRes.id}`);

      expect(deleteRes.status).toEqual(200);
      expect(deleteRes).toEqual({ id: createRes.id });
    });//end successful delete

    it('should return 404 if id is not a saved post', async () => {
      try{
        const response = await request(server).delete('/999999999999999999999');
      } catch(e) {
        expect(e.status).toEqual(404);
      }
    })// end delete failure test
  });//end delete tests
});//end server.js
