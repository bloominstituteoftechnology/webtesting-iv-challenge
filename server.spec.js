const request = require("supertest");
const faker = require("faker");

const server = require("./server.js");

let randomTransaction = faker.helpers.createTransaction();

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
  describe("POST /resources", () => {
    it("should return HTTP status code 201 Created", async () => {
      const response = await request(server)
        .post("/resources")
        .send(randomTransaction);
      const actual = response.status;
      const expected = 201;
      expect(actual).toEqual(expected);
    });
    it("should return in JSON format", async () => {
      const response = await request(server)
        .post("/resources")
        .send(randomTransaction);
      const actual = response.type;
      const expected = "application/json";
      expect(actual).toEqual(expected);
    });
    it("should return expected data", async () => {
      const response = await request(server)
        .post("/resources")
        .send(randomTransaction);
      const actual = response.body;
      const expected = randomTransaction;
      expect(actual).toEqual(expected);
    });
  });
  describe("DELETE /resources/:account", () => {
    it("should return HTTP status code 410 Gone", async () => {
      const response = await request(server)
        .delete("/resources/" + randomTransaction.account)
        .send({ id: randomTransaction.account });
      const actual = response.status;
      const expected = 410;
      expect(actual).toEqual(expected);
    });
    it("should return in JSON format", async () => {
      const response = await request(server)
        .delete("/resources/" + randomTransaction.account)
        .send(randomTransaction);
      const actual = response.type;
      const expected = "application/json";
      expect(actual).toEqual(expected);
    });
    it("should return expected data", async () => {
      const response = await request(server)
        .delete("/resources/" + randomTransaction.account)
        .send(randomTransaction.account);
      const actual = response.body.deleted;
      const expected = randomTransaction.account;
      expect(actual).toEqual(expected);
    });
  });
});
