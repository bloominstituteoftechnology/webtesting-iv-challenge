const request = require("supertest");
const server = require("./API/server");

describe("server", () => {
  describe("POST /users endpoint", () => {
    it("should return status 201", async () => {
      let response = await request(server)
        .post("/users")
        .send({ firstName: "Adam", lastName: "Hinckley" });

      expect(response.status).toBe(201);
    });

    it("should return a greeting with their name", async () => {
      let response = await request(server)
        .post("/users")
        .send({ firstName: "Adam", lastName: "Hinckley" });

      expect(response.body).toEqual({ hello: "Adam Hinckley" });
    });
  });

  describe("DELETE /users/:id endpoint", () => {
    it("should return status 200", async () => {
      let response = await request(server).delete("/users/1");

      expect(response.status).toBe(200);
    });

    it("should return the message user deleted", async () => {
      let response = await request(server).delete("/users/1");
      expect(response.body).toEqual({ message: "user deleted" });
    });
  });
});
