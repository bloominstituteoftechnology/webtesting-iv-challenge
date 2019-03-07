const server = require("./index");
const request = require("supertest");

describe("post user endpoint", () => {
  it("should return user name", async () => {
    const name = "name";
    const response = await request(server)
      .post("/users")
      .send({ name });
    expect(response.body).toEqual({ user: "name" });
  });

  it("should return 201 status", async () => {
    const response = await request(server).post("/users");
    expect(response.status).toBe(201);
  });

  it("should return JSON", async () => {
    const response = await request(server).post("/users");
    expect(response.type).toBe("application/json");
  });
});
