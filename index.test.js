const request = require("supertest");
const server = require("./api/server");

describe("Test the root path", () => {
  it("should return status code 200", async () => {
    let response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
});
