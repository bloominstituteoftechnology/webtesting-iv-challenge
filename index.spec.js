const request = require("supertest");
const server = require("./API/server.js");

describe("server", () => {
  describe("POST /greet endpoint", () => {
    it("should return status 200", async () => {
      let response = await request(server).post("/greet");

      expect(response.status).toBe(200);
    });

    it("should return a greeting with their name", async () => {
      let response = await request(server)
        .post("/greet")
        .send({ firstName: "Adam", lastName: "Hinckley" });

      expect(response.body).toEqual({ hello: "Adam Hinckley" });
    });
  });

  describe("DELETE /users/:id endpoint", () => {
    it("should return status 200", async () => {
      let response = await request(server).delete("/users/:id");

      expect(response.status).toBe(200);
    });

    it("should return the message user deleted", async () => {
      let response = await request(server).delete("/users/:id");
      expect(response.body).toEqual({ message: "user deleted" });
    });
  });
});
