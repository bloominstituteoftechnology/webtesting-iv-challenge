const server = require("./server.js");
const request = require("supertest");

describe("test API endpoints", () => {
  it("GET / should return 200 status code", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });

  it("GET /posts should return JSON", async () => {
    const response = await request(server).get("/posts");
    expect(response.type).toBe("application/json");
  });

  it("POST /posts should return 400 stauts code if no body is sent", async () => {
    const response = await request(server).post("/posts");
    expect(response.status).toBe(400);
  });

  it("POST /posts should return 201 status code if body is sent", async () => {
    const post = { name: "This is an extra post", content: "Mooore text" };
    const response = await request(server)
      .post("/posts")
      .send(post);
    expect(response.status).toBe(201);
  });

  it("POST /posts should return JSON message", async () => {
    const response = await request(server).post("/posts");
    expect(response.type).toBe("application/json");
  });

  it("PUT /posts should return 400 stauts code if no body is sent", async () => {
    const response = await request(server).put("/posts");
    expect(response.status).toBe(400);
  });

  it("PUT /posts should return 201 status code if body is sent", async () => {
    const post = { name: "This is an extra post", content: "Mooore text" };
    const response = await request(server)
      .put("/posts")
      .send(post);
    expect(response.status).toBe(201);
  });

  it("DELTE /posts/:id should return 202 status code", async () => {
    const response = await request(server).delete("/posts/1");
    expect(response.status).toBe(202);
  });

  it("DELTE /posts/:id should return JSON", async () => {
    const response = await request(server).delete("/posts/1");
    expect(response.type).toEqual("application/json");
  });
});
