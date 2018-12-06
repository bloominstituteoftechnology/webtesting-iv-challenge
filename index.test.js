const request = require("supertest");
const server = require("./api/server");

describe("server.js", () => {
  describe("Test the root path", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
  });

  describe("POST /create", () => {
    it("should return status code 201", async () => {
      let response = await request(server).post("/create");
      expect(response.status).toBe(201);
    });

    it("should return with a body {message: 'user Jasmine created'}", async () => {
      let response = await request(server)
        .post("/create")
        .send({ name: "Jasmine" });
      expect(response.body).toEqual({ message: "user Jasmine created" });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should return status code 200", async () => {
      let response = await request(server).delete("/users/:id");
      expect(response.status).toBe(200);
    });

    it("should delete a user", async () => {
      let response = await request(server)
        .delete("/users/:id")
        .send({ _id: 2, name: "pikachu" });
      expect(response.body).toEqual({ message: "user deleted" });
    });
  });
});
