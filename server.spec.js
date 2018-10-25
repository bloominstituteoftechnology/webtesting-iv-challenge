const request = require("supertest");
const server = require("./api/server.js");

describe('server', () => {

// ===== GET request
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

// ===== POST request
describe("POST /users/:username", () => {
  it("should add the person", async () => {
    const username = "Lucas";
    const expected = { Username: "Lucas" };
    const response = await request(server).post(`/users/${username}`);
    expect(response.body).toEqual(expected);
  });

  it("should return status code 200(OK)", async () => {
    const username = "Lucas";
    const response = await request(server).post(`/users/${username}`);
    expect(response.status).toBe(200);
  });

  it("should return JSON", async () => {
    const username = "Lucas";
    const response = await request(server).post(`/users/${username}`);
    expect(response.type).toBe("application/json");
  });
});

// ===== GET (USERS)
describe('GET /users', () => {
    it('should return users', async () => {
      const response = await request(server).get('/users');
      expect(response.status).toBe(200);
    });
  });


});