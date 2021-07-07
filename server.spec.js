const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('root endpoints (/)', () => {
    test('should return status code 200', async () => {
      const expected = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expected);
    })
    test('should return json', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    })
    test('should return "API is running"', async () => {
      const expected = {api: 'API is running'}
      const response = await request(server).get('/');
      expect(response.body).toEqual(expected);
    })
  })
  describe('get to /parishes', () => {
    test('should return status code 200', async () => {
      const expected = 200;
      const response = await request(server).get('/parishes');
      expect(response.status).toEqual(expected);
    })
    test('should return json', async () => {
      const response = await request(server).get('/parishes');
      expect(response.type).toEqual('application/json');
    })
    test('should return "API is running"', async () => {
      const expected = { name: 'Westmoreland', capital: 'Savanna-la-Mar' }
      const response = await request(server).get('/parishes');
      expect(response.body).toEqual(expected);
    })
  })
  describe('post to /parishes', () => {
    test('should return status code 201 when success', async () => {
      const expected = 201;
      const response = await request(server)
        .post('/parishes')
        .send({ name: 'Westmoreland', capital: 'Savanna-la-Mar' });
      expect(response.status).toEqual(expected);
    })
    test('should return status code 422 when missing info', async () => {
      const expected = 422;
      const response = await request(server)
        .post('/parishes')
        .send({ name: '', capital: 'Savanna-la-Mar' });
      expect(response.status).toEqual(expected);
    })
    test('should return the created country', async () => {
      const expected = { name: 'Westmoreland', capital: 'Savanna-la-Mar' };
      const response = await request(server)
        .post('/parishes')
        .send({ name: 'Westmoreland', capital: 'Savanna-la-Mar' });
      expect(response.body).toEqual(expected);
    })
    test('should return an error if missing data', async () => {
      const expected = { msg: 'You need a name and capital.'};
      const response = await request(server)
        .post('/parishes')
        .send({ name: '', capital: 'Savanna-la-Mar' });
      expect(response.body).toEqual(expected);
    })
  })
  describe('delete to /parishes/:parish', () => {
    test('should return status code 200', async () => {
      const expected = 200;
      const response = await request(server)
        .delete('/parishes/Westmoreland')
      expect(response.status).toEqual(expected);
    })
    test('should return status code 422', async () => {
      const expected = 422;
      const response = await request(server)
        .delete('/parishes/?')
      expect(response.status).toEqual(expected);
    })
    test('should return json', async () => {
      const response = await request(server).delete('/parishes/Westmoreland');
      expect(response.type).toEqual('application/json');
    })
    test('should return confirmation country was deleted', async () => {
      const expected = { msg: `Westmoreland has been deleted.` };
      const response = await request(server)
        .delete('/parishes/Westmoreland')
      expect(response.body).toEqual(expected);
    })
  })
})