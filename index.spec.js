const request = require("supertest");

const server = require("./api/server");

describe("server.js", () => {
  describe("/ route", () => {
    it("Should return status 200", async () => {
      let res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("Should return JSON", async () => {
      let res = await request(server).get("/");

      expect(res.type).toBe("application/json");
    });
  });

  describe("POST /hello endpoint", () => {
    it("Should return users first and last name", async () => {
      let res = await request(server)
        .post("/hello")
        .send({ firstName: "Riley", lastName: "Brown" });

      expect(res.body).toEqual({ hello: "Riley Brown" });
    });
  });

  describe("Delete /hello endpoint", () => {
    it("Should delete a greeting", async () => {
      let res = await request(server)
        .delete("/hello")
        .send({ test: "pass" });
      expect(res.body).toEqual({ test: "passed" });
    });
  });
});
