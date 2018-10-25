const request = require("supertest");

const server = require("./api/server.js");

describe("POST /users/:username", () => {
  it("should add the person", async () => {
    const username = "Caitlin";
    const expected = { Username: "Caitlin" };

    const response = await request(server).post(`/users/${username}`);

    expect(response.body).toEqual(expected);
  });

  it("should return status code 200(OK)", async () => {
    const username = "Caitlin";

    const response = await request(server).post(`/users/${username}`);

    expect(response.status).toBe(200);
  });
});

describe("DELETE /users/:username", () => {
  it("should delete the specified person", async () => {
    const username = "Caitlin";
    const expected = { deleted: `${username}` };

    const response = await request(server).delete(`/users/${username}`);

    expect(response.body).toEqual(expected);
  });

  it("should return status code 200(OK)", async () => {
    const username = "Caitlin";

    const response = await request(server).delete(`/users/${username}`);

    expect(response.status).toBe(200);
  });
});
