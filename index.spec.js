const request = require("supertest");

const server = require("./api/server");

describe("server.js", () => {
  describe("/", () => {
    it("should keep me sane by returning a 200 code", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/");

      expect(response.type).toBe("application/json");
    });

    it('should return with a body of {api: "running"}', async () => {
      let response = await request(server).get("/");
      expect(response.body).toEqual({ api: "running" });
    });
  });
});
