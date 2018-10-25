const request = require("supertest");
const server = require("./server.js");

describe("spinup server tests", () => {
  it("returns a status code of 200", async () => {
    const response = await request(server).get("/");

    expect(response.status).toEqual(200);
  });
});
