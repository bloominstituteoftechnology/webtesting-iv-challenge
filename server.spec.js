const request = require("supertest");

const server = require("./api/server.js");

describe("POST /users", () => {
  it("should add the person", async () => {
    const username = "Caitlin";
    const age = "26";
    const height = "68";

    const expected = { username: "Caitlin", age: "26", height: "68" };

    const response = await request(server)
      .post("/users")
      .send({ username, age, height });

    expect(response.body).toEqual(expected);
  });

  it("should return status code 200(OK)", async () => {
    const response = await request(server).post(`/users`);

    expect(response.status).toBe(200);
  });
  it("should return JSON", async () => {
    const response = await request(server).post(`/users`);

    expect(response.type).toBe("application/json");
  });
});

describe("DELETE /users", () => {
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

  it("should return JSON", async () => {
    const username = "Caitlin";
    const response = await request(server).delete(`/users/${username}`);

    expect(response.type).toBe("application/json");
  });
});
