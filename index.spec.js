const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  // test for POST ENDPOINT
  describe('POST /pets/:petsname', () => {
    // check for adding content inside response.body
    it('should add a name of a pet', async () => {
      const petsname = 'Spot';
      const expected = { petsname: 'Spot' };

      const response = await request(server)
        .post(`/pets/${petsname}`);

      expect(response.body).toEqual(expected);
    });
  });
});