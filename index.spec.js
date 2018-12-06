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
    it("should return the added user and successful status code", async () => {
      let response = await request(server)
        .post("/")
        .send({ name: "user3" });
      expect(response.body).toEqual({ name: "user3", id: 3 });
      expect(response.status).toBe(201);
    });
    it("should return an error if no name is provided", async () => {
      let response = await request(server)
        .post("/")
        .send({});
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Please provide a name." });
    });
  });
  describe("DELETE", () => {
    it("should return the deleted user and successful status code", async () => {
      let response = await request(server)
        .delete("/")
        .send({ id: 1 });
      expect(response.body).toEqual({ name: "user", id: 1 });
      expect(response.status).toBe(200);
    });
    it("should return an error if not given a valid id", async () => {
      let response = await request(server)
        .delete("/")
        .send({ id: 11 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Please provide a valid id." });
    });
  });
});
