const request = require("supertest");

const server = require("./server");

describe("server", () => {
  it("should return OK and a JSON object from the index route", async () => {
    const expectedBody = { api: "running" };

    const response = await request(server).get("/");

    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(expectedBody);
  });
});
