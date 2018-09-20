const request = require("supertest");

const server = require("./server.js");

describe("server.js tests", () => {
  it("runs", () => {
    expect(true).toBeTruthy();
  });

  describe("GET to /", () => {
    it("returns a 200 (OK) status code", async () => {
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it('should return {api: "running"}', async () => {
      const expectedBody = { api: "running" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/hello");

      expect(response.type).toEqual("application/json");
    });

    it("should return JSON", async () => {
      let name = "jurgen";
      let last = "kela";

      let response = await request(server)
        .post(`/greet/${name}`)
        .send({ last });

      expect(response.body).toEqual({ hello: "kyle meltzer" });
    });
  });
});
