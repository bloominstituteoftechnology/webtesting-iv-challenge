const request = require('supertest');
const server = require('./api/server.js');

//getting
describe('server', () => {
  describe('GET /', () => {
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);

    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });

    it('should return { message: "server up" }', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: 'server up' });
    });
  });

  //create

  describe('POST /hello/:name', () => {
    it('should greet the person', async () => {
      const name = 'Patrick';
      const lastName = 'Thompson';
      const expected = { hello: 'Patrick Thompson' };

      const response = await request(server)
        .post(`/hello/${name}`)
        .send({ lastName });

      expect(response.body).toEqual(expected);
    });

    it('should add person to the Doe family if no last name provided', async () => {
      const name = 'Patrick';
      const expected = { hello: 'Patrick Doe' };

      const response = await request(server).post(`/hello/${name}`);

      expect(response.body).toEqual(expected);
    });
  });

  it('can run more tets', () => {
    expect(false).toBeFalsy();
  });

  it('can run even more tets', () => {
    expect(false).toBeFalsy();
  });
});

describe("DELETE /users/:name", () => {
    it("should delete the specified person", async () => {
      const name = "michael";
      const lastName = "trevino"
      const expected = { deleted: `${name} ${lastName}` };
  
      const response = await request(server).delete(`/goodbye/${name}`);
  
      expect(response.body).toEqual(expected);
    });
  
    it("should return status code 200(OK)", async () => {
      const name = "michael";
  
      const response = await request(server).delete(`/goodbye/${name}`);
  
      expect(response.status).toBe(200);
    });
  
    it("should return JSON", async () => {
      const name = "michael";
      const response = await request(server).delete(`/goodbye/${name}`);
  
      expect(response.type).toBe("application/json");
    });
  });