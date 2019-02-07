const request = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig");

describe("ROUTE HANDLERS", () => {
  describe("get /", () => {
    it("recieves a 200 status code", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });

    it("recieves a 400 status code", async () => {
      const response = await request(server).get("/");
      response.status = 400;
      expect(response.status).toBe(400);
    });

    it("recieves json format", async () => {
      const response = await request(server).get("/");

      expect(response.type).toMatch(/json/i);
    });

    it("should return proper object", async () => {
      const response = await request(server).get("/");

      expect(response.body).toEqual({ users: [{ username: "joseph" }] });
    });
  });
  describe("post /", () => {
    afterEach(async () => {
      await db("users").truncate();
    });
    it("responds with 201 when body correct", async () => {
      const body = { username: "jimmy" };
      const response = await request(server)
        .post("/")
        .send(body);

      expect(response.status).toBe(201);
    });

    it("responds with 400 when body incorrect", async () => {
      const body = {};
      const response = await request(server)
        .post("/")
        .send(body);

      expect(response.status).toBe(400);
    });
  });
});
