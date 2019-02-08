const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig');

describe('the route handlers', () => {

  describe('get /', () => {
    it('responds with 200', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    })

    it('responds with json', async () => {
      const response = await request(server).get('/');

      expect(response.type).toMatch(/json/i);
    })

    it('sends correct response object', async () => {
      const response = await request(server).get('/');

      expect (response.body).toEqual({ API: 'Working' });
    })
  });

})

describe('get /musicians', () => {

  it('responds with 200', async () => {
    // not response, the homie
    const response = await request(server).get('/musicians');

    expect(response.status).toBe(200);
  })

  it('sends correct response object', async () => {
    const response = await request(server).get('/musicians');

    expect(response.body).toEqual([]);
  })

})


describe('post /musicians', () => {

  afterEach(async () => {
    await db('musicians').truncate();
  });

  it('responds with 201 when body is correct', async () => {
    const body = { name: 'Jazzy' };
    const response = await request(server).post('/musicians').send(body);

    expect(response.status).toBe(201);
  })

  it('responds with 400, when body is missing data', async () => {
    const body = {};
    const response = await request(server).post('/musicians').send(body);

    expect(response.status).toBe(400);
  })

})

describe('delete /musicians/:id', () => {

  afterEach(async () => {
    await db('musicians').truncate();
  });

  it('responds with 404 when musician ID is not available', async () => {
    const id = 1;
    const response = await request(server).delete(`/musicians/${id}`);

    expect(response.status).toBe(404);
  })

  it('responds with 200, when musician is deleted', async () => {
    const id = 1;
    const body = await request(server).post("/musicians").send({ name: "Mykael"});
    const response = await request(server).delete(`/musicians/${id}`);

    expect(response.status).toBe(200);
  })

  it('sends correct response object', async () => {
    const id = 1;
    const body = await request(server).post("/musicians").send({ name: "Mykael"});
    const response = await request(server).delete(`/musicians/${id}`);

    expect(response.body).toEqual(1);
  })

})

