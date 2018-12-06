const request = require("supertest");

const server = require("./server");

describe("/users create route", () => {
  it("should return a status code 201", async () => {
    const body = { name: "Peter" };
    const response = await request(server)
      .post("/users")
      .send(body);

    expect(response.status).toBe(201);
  });
  it("should return a message object welcoming user", async () => {
    const body = { name: "Peter" };
    const expected = { message: "Hello Peter, welcome to server testing!" };
    const response = await request(server)
      .post("/users")
      .send(body);

    expect(response.body).toEqual(expected);
  });
});

describe("/users delete route", () => {
  it("should return a status code 200", async () => {
    const response = await request(server).delete("/users");

    expect(response.status).toBe(200);
  });
  it("should return an id", async () => {
    const expected = { message: "User deleted." };
    const response = await request(server).delete("/users");

    expect(response.body).toEqual(expected);
  });
});
