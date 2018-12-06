const request = require("supertest");

const server = require("./index");

describe("index.js", () => {
  describe("/ route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });

  describe("POST", () => {
    it("should return the added user", async () => {
      let response = await request(server)
        .post("/")
        .send({ name: "user3" });
      expect(response.body).toEqual({ name: "user3", id: 3 });
    });
    it("return an error if no name is provided", async () => {
      let response = await request(server)
        .post("/")
        .send({});
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "Please provide a name." });
    });
  });
});
