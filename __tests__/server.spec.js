const request = require("supertest");
const server = require("../server.js");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /", () => {
    it("returns a 200 (OK) status code", async () => {
      // get access to the server
      // use supertest to make a GET to the server
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("correctly passing req.body check", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
});
