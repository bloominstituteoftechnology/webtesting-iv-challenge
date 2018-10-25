const request = require("supertest");
const server = require("../server.js");

describe("API", () => {
  describe("GET /users", () => {
    it("should get all users and check resp", async () => {
      const resp = await request(server).get("/users");
      expect((resp.body.message)).toBe("Got all users");
    });
  });
  describe("POST /users", () => {
    it("should post user to DB and return success message", async () => {
      const resp = await request(server)
        .post("/users")
        .send({
          username: "J" + Math.floor(Math.random() * 1000),
          age: Math.floor(Math.random() * 1000)
        });
      expect((resp.body.message)).toBe(
        "User post successful"
      );
    });
  });
  describe("DELETE /users/:id", () => {
    it("should delete user and return user deleted message", async () => {
      const resp = await request(server).delete("/users/2");
      expect((resp.body.message)).toBe("User deleted");
    });
  });
  describe("UPDATE /users/:id", () => {
    it("should update user and return message 'updated user'", async () => {
      const resp = await request(server).put("/users/1").send({username: "john", age: 40});
      expect((resp.body.message)).toBe("Updated user");
    });
  });
});
