const request = require('supertest');

const server = require('./server');

describe('server here', () => {
  it('Should return a running server and return a JSON object', async () => {
    const expectedBody = { api: '===API is running === '};
    const response = await request(server).get('/');

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual({api: 'API is totally running'});
  })

  it('Should bring a request for api/food with a list of foodstuffs', async () => {
    const response = await request(server).get('/api/food')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.foods).toHaveLength(5)
  })

  // it('Should implement a new food item via POST', async () => {
  //   const response = await request(server).post('/api/food')
  //   expect
  // })
})

