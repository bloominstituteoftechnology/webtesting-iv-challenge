const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  // test for POST ENDPOINT
  describe('POST /pets/:petsname', () => {
    // check for correct http status code
    it('should return status code 201', async () => {
      const response = await request(server).post('/pets/:petsname');

      expect(response.status).toBe(201);
    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).post('/pets/:petsname');

      expect(response.type).toBe('application/json');
    });

    // check for adding content inside response.body
    it('should add a name of a pet', async () => {
      const petsname = 'Spot';
      const expected = { petsname: 'Spot' };

      const response = await request(server)
        .post(`/pets/${petsname}`);

      expect(response.body).toEqual(expected);
    });
  });

  // test for DELETE ENDPOINT
  describe('DELETE /pets/:petsname', () => {
    it('should delete the pet specified', async () => {
      const petsname = 'Spot';
      const expected = { confirmed: `${petsname} has been deleted` };

      const response = await request(server)
        .delete(`/pets/${petsname}`);

        expect(response.body).toEqual(expected);
    });

    // check for correct http status code
    it('should return status code 200(OK)', async () => {
      const response = await request(server).delete('/pets/:petsname');

      expect(response.status).toBe(200);
    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).delete('/pets/:petsname');

      expect(response.type).toBe('application/json');
    });
  });
});