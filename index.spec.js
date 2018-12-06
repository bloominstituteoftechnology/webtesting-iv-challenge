const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("/ endpoint", () => {
    it("runs the tests", () => {
      expect(true).toBeTruthy();
    });
    it("returns status code 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("return JSON", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
    it(`the returned body is { api: "working"} `, async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({ api: "working" });
    });
  });
});
