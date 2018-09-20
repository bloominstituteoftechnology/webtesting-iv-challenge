const server = require("./server.js");
const request = require("supertest");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("/", () => {
    it("returns a 200 status code", async () => {
      //get access to the server
      //user supertest to make a GET to the server
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });

    it("should return api: running", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });

    it("should return JSON", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/hello");
      expect(response.type).toEqual("application/json");
    });
  });
});
