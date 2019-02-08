const db = require('../data/dbConfig');
const request = require("supertest");
const server = require("./server.js");


afterEach(async () => {
    await db("users").truncate();
  });

describe("the route handlers", () => {
  describe("get /users", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/users");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/users");
      expect(response.type).toMatch(/json/i);
    });
    it("sends the correct response object", async () => {
      const response = await request(server).get("/users");
      expect(response.body).toEqual([]);
    });
  });
  describe("post /users", () => {
    it("responds with 201 when body is correct", async () => {
      const body = { name: "Jackie" };
      const response = await request(server)
        .post("/users")
        .send(body);
      expect(response.status).toBe(201);
    });
    it("responds with 400 when body is missing name", async () => {
      const body = {};
      const response = await request(server)
        .post("/users")
        .send(body);
      expect(response.status).toBe(400);
    });
    it("responds with 400 when body name is empty string", async () => {
      const body = { name: "" };
      const response = await request(server)
        .post("/users")
        .send(body);
      expect(response.status).toBe(400);
    });
    it("responds with 400 when body name is not a string", async () => {
      const body = { name: 82 };
      const response = await request(server)
        .post("/users")
        .send(body);
      expect(response.status).toBe(400);
    });
    it("responds with 400 when body name exceeds 255 chars", async () => {
      const body = {
        name:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      };
      const response = await request(server)
        .post("/users")
        .send(body);
      expect(response.status).toBe(400);
    });
  });
  describe("delete /users/:id", () => {
    it("responds with 200 when successful", async () => {
      const id = 1;
      const user = await request(server).post("/users").send({name: "Jackie"})
      const response = await request(server).delete(`/users/${id}`)
    expect(response.status).toBe(200);
    })
    it("responds with 404 when no matching user", async () => {
      const id = 77897543457875432455567980905662;
      const response = await request(server).delete(`/users/${id}`)
    expect(response.status).toBe(404);
    })
    it("responds with json", async () => {
      const id = 1;
      const user = await request(server).post("/users").send({name: "Jackie"})
      const response = await request(server).delete(`/users/${id}`);
      expect(response.type).toMatch(/json/i);
    });
    it("sends the correct response object", async () => {
      const id = 1;
      const user = await request(server).post("/users").send({name: "Jackie"})
      const response = await request(server).delete(`/users/${id}`);
      expect(response.body).toEqual(1);
    })
  })
});
