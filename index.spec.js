const request = require('supertest');

const server = require('./api/server.js')

describe('server.js', () => {
  describe.skip('root endpoint (/)', () => {

    it('should return status code 200', async () => {
      const expected = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expected);
    });

    it('should return the response in json format', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });

    it('should return {api: "running"} in the body', async () => {
      const response = await request(server).get('/');
      expect(response.body).toEqual({api: 'running'});
    });


  });

  describe('POST /monkey/:name', () => {
    it('should greet the person', async () => {
      const name = 'Curious';
      const lastName = 'George';
      const expected = { hello: 'Curious George' };

      const response = await request(server)
        .post(`/monkey/${name}`)
        .send({ lastName });

      console.log('// ******************');
      console.log(response);

      expect(response.body).toEqual(expected);
    });

    it('should add person to the Doe family if no last name provided', async () => {
      const name = 'Curious';
      const expected = { hello: 'Curious Doe' };

      const response = await request(server).post(`/monkey/${name}`);

      expect(response.body).toEqual(expected);
    });
  });

  describe('DELETE /monkey/:name', () => {
    it('should greet the person', async () => {
      const name = 'Curious';
      const lastName = 'George';
      const expected = { hello: 'Curious George' };

      const response = await request(server)
        .post(`/monkey/${name}`)
        .send({ lastName });

      console.log('// ******************');
      console.log(response);

      expect(response.body).toEqual(expected);
    });

    it('should add person to the Doe family if no last name provided', async () => {
      const name = 'Curious';
      const expected = { hello: 'Curious Doe' };

      const response = await request(server).post(`/monkey/${name}`);

      expect(response.body).toEqual(expected);
    });
  });

});
