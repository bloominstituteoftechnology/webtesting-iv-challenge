const request = require("supertest");
const server = require('../index')

describe("Index Route", () => {
  describe("GET /", () => {
    it("should respond with status of 200", async () => {
      const res = await request(server).get("/");
      console.log(res.status)
      expect(res.status).toBe(200);
    });
  });
});

