const request = require("supertest");

const server = require("./server");

describe("server", () => {
  it("should return Ok and a json object from the index route", async () => {
    let expectedBody = { api: "running!" };

    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(expectedBody);
  });

  it("should should return Ok and return a json object of the new user created", async () => {
    let expectedBody = {}; //user object needs to be put here

    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedBody);
  });
});
