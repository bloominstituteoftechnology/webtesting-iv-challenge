const fakeRequest = require("supertest");

const server = require("../server.js");

describe("server.js", () => {
  describe("Basic Get Request", () => {
    it("should return status code 200", async () => {
      const response = await fakeRequest(server).get("/");
      expect(response.status).toBe(200);
    });

    it('should return body of "{api: "running"}"', async () => {
      const response = await fakeRequest(server).get("/");
      expect(response.body).toEqual({ api: "running" });
    });
  });

  describe("User EndPoints", () => {
    const testUser = { username: "Derrick", password: "asdf" };

    it("should create a user", async () => {
      const response = await fakeRequest(server)
        .post("/api/users")
        .send(testUser);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(testUser);
    });
  });
});
