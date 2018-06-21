const request = require("supertest");

const server = require("./server");

describe("server.js", () => {
  it("should return a 200 status code and a JSON object fron the index route", async () => {
    const expectedBody = { api: "running" };

    const response = await request(server).get("/");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual("application/json");
  });
});
