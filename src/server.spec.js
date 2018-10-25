const request = require("supertest");
const server = require("./server.js");

describe("spinup server tests", () => {
  it("returns a status code of 200", async () => {
    const response = await request(server).get("/");

    expect(response.status).toEqual(200);
  });
});

// base mvp tests

describe("POST /clients/:id test", () => {
  it("should return JSON object { message: `Client added` } when a client is successfully added and a status code of 200", async () => {
    const response = await request(server).post("/clients");
    // test part 1
    expect(response.body).toEqual({ message: "Client added" });

    // test part 2
    expect(response.status).toEqual(201);
  });
});
