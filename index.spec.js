const request = require("supertest");

const server = require("./api/server.js");

describe("server.js", () => {
  describe("/ route", () => {
    it("should return status code 200", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });
  });
  it("should return JSON", async () => {
    let response = await request(server).get("/");

    expect(response.type).toBe("application/json");
  });

  it("should return with a body like: {api 'up' }", async () => {
    let response = await request(server).get("/");

    expect(response.body).toEqual({ api: "up" });
  });

  describe("/greet endpoint", () => {
    it("sould greet the person", async () => {
      let response = await request(server)
        .post("/greet")
        .send({ firstname: "David", lastname: "Soto" });

      expect(response.body).toEqual({ hello: "David Soto" });
    });
  });
});
