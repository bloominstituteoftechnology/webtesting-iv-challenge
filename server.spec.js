const request = require("supertest");
const server = require("./api/server.js");

describe('server', () => {


// ===== GET server 
    describe('GET /', () => {
        it('should return { message: "server up" }', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ message: 'server up' });
        });
        it('should return status 200(OK)', async () => {
          const response = await request(server).get('/');
          expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
          const response = await request(server).get('/');
          expect(response.type).toBe('application/json');
        });
      });


// ===== GET USER-LIST
describe('GET /api/users', () => {
    it('should return user-list', async () => {
      const response = await request(server).get('/api/users');
      expect(response.status).toBe(200);
    });
    it('should return status 200(OK)', async () => {
        const response = await request(server).get('/api/users');
        expect(response.status).toBe(200);
      });
    it("should return JSON", async () => {
        const response = await request(server).get('/api/users');
        expect(response.type).toBe("application/json");
      });
  });


// ===== POST request using JSON OBJECT
describe("POST /api/users", () => {
  it("should add the user", async () => {
    const username = "Lucas";
    const expected = { username: "Lucas" };
    const response = await request(server).post(`/api/users/${username}`);
    expect(response.body).toEqual(expected);
  });
  it("should return status 200(OK)", async () => {
    const username = "Lucas";
    const response = await request(server).post(`/api/users/${username}`);
    expect(response.status).toBe(200);
  });
  it("should return JSON", async () => {
    const username = "Lucas";
    const response = await request(server).post(`/api/users/${username}`);
    expect(response.type).toBe("application/json");
  });
});


// ===== POST using '/users/:username'
describe("POST /api/users/:username", () => {
    it("should add the user", async () => {
      const username = "Lucas";
      const expected = { username: "Lucas" };
      const response = await request(server).post(`/api/users/${username}`);
      expect(response.body).toEqual(expected);
    });
  
    it("should return status 200(OK)", async () => {
      const username = "Lucas";
      const response = await request(server).post(`/api/users/${username}`);
      expect(response.status).toBe(200);
    });
  
    it("should return JSON", async () => {
      const username = "Lucas";
      const response = await request(server).post(`/api/users/${username}`);
      expect(response.type).toBe("application/json");
    });
  });


// ===== DELETE using ID
describe("DELETE /api/users/:username", () => {
    it("should delete the user", async () => {
      const username = "Lucas";
      const expected = { deleted: `${username}` };
      const response = await request(server).delete(`/api/users/${username}`);
      expect(response.body).toEqual(expected);
    });
    it("should return status 200(OK)", async () => {
      const username = "Lucas";
      const response = await request(server).delete(`/api/users/${username}`);
      expect(response.status).toBe(200);
    });
    it("should return JSON", async () => {
      const username = "Lucas";
      const response = await request(server).delete(`/api/users/${username}`);
      expect(response.type).toBe("application/json");
    });
  });

});