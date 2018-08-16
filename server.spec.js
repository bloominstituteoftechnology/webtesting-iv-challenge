const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("should return HTTP status code 200 OK", async () => {
      const response = await request(server).get("/");
      const actual = response.status;
      const expected = 200;
      expect(actual).toEqual(expected);
    });
    it("should return in JSON format", async () => {
      const response = await request(server).get("/");
      const actual = response.type;
      const expected = "application/json";
      expect(actual).toEqual(expected);
    });
    it("should return expected data", async () => {
      const response = await request(server).get("/");
      const actual = response.body;
      const expected = { api: "running" };
      expect(actual).toEqual(expected);
    });
  });
  describe("GET /sing", () => {
    it("should sing", async () => {
      const response = await request(server).get("/sing");
      const actual = response.text;
      const expected = "I believe I can fly, I believe I can test an A-P-I!";
      expect(actual).toBe(expected);
    });
  });
});
