const request = require("supertest");
const server = require("./api/server.js");

describe("POST /users/:username", () => {
  it("should add the person", async () => {
    const username = "Lucas";
    const expected = { Username: "Lucas" };
    const response = await request(server).post(`/users/${username}`);
    expect(response.body).toEqual(expected);
  });

  it("should return status code 200(OK)", async () => {
    const username = "Lucas";
    const response = await request(server).post(`/users/${username}`);
    expect(response.status).toBe(200);
  });
});