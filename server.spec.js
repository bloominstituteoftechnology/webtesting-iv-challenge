const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('runs', async () => {
    await request(server)
      .get('/')
      .expect(200)
  });

  it('performs posts', async () => {
    await request(server)
      .post('/')
      .expect(200)
  });

  it('returns JSON when posting', async () => {
    const JSON = { "server": "running"};
    const res = await request(server).post('/');
    expect(res.body).toEqual(JSON);
  });

  it('deletes', async () => {
    await request(server)
      .delete('/')
      .expect(202)
  });
});