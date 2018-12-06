const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/');

      expect(response.status).toBe(200);

      // hit the endpont and get the response
      // request(server)
      //   .get('/')
      //   .then(response => {
      //     expect(response.status).toBe(200);
      //   });
    });
    it('should return JSON', async () => {
      let response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });
    it('should return with a body like: { api: "up" }', async () => {
      let response = await request(server).get('/');

      expect(response.body).toEqual({ api: 'up' });
    });
  });
  describe('', () => {
    it('should greet the person', async () => {
    });
  });
});


describe("POST", () => {
  it("should return a name", async () => {
    const name = "y";
    const response = await request(server)
      .post("/new")
      .send({ name });
     expect(response.body).toEqual({ user: "y" });
  });
   it("should return status 201", async () => {
    const response = await request(server).post("/new");
     expect(response.status).toBe(201);
  });
   it("should return JSON", async () => {
    const response = await request(server).post("/new");
     expect(response.type).toBe("application/json");
  });
});
 describe(" DELETE", () => {
  it("should return a true", async () => {
    const name = "y";
    const response = await request(server)
      .delete("/remove")
      .send({ name });
     expect(response.body).toEqual(true);
  });
   it("should return status 200", async () => {
    const name = "y";
    const response = await request(server)
      .delete("/remove")
      .send({ name });
     expect(response.status).toBe(200);
  });
   it("should return JSON", async () => {
    const response = await request(server).delete("/remove");
     expect(response.type).toBe("application/json");
  });
});