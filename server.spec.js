const request = require("supertest");
const { server, db } = require("./server.js");

describe("server.js", () => {
  describe("(/) root endpoint", () => {
    it("should return status 200 ok", async () => {
      const expected = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expected);
    });
  });
  describe("(/user) db", () => {
    it("should return db", async () => {
      const expected = db;
      const response = await request(server).get("/user");
      expect(response.body).toEqual(expected);
    });
    it("should return status 200 ok", async () => {
      const expected = 200;
      const response = await request(server).get("/user");
      expect(response.status).toEqual(expected);
    });
  });
  describe("(/users) to display users", () => {
    it("should return object users: michael", async () => {
      const expected = { users: "michael" };
      const response = await request(server).get("/users");
      expect(response.body).toEqual(expected);
    });
    it("should return json", async () => {
      const response = await request(server).get("/users");
      expect(response.type).toEqual("application/json");
    });
    it("should return status code 200", async () => {
      const expected = 200;
      const response = await request(server).get("/users");
      expect(response.status).toEqual(expected);
    });
  });
  describe("(/name) to post name", () => {
    it("should return create code 201", async () => {
      const expected = 201;
      const response = await request(server)
        .post("/name")
        .send({ user: "name" });
      expect(response.status).toEqual(expected);
    });
    it("should post user of provided user", async () => {
      const expected = { hello: "george" };
      const response = await request(server)
        .post("/name")
        .send({ user: "george" });
      expect(response.body).toEqual(expected);
    });
    it("should return error message if no user", async () => {
      const expected = { message: "need user" };
      const response = await request(server)
        .post("/name")
        .send({ user: "" });
      expect(response.body).toEqual(expected);
    });
    it("should return error code 422 if no user", async () => {
      const expected = 422;
      const response = await request(server)
        .post("/name")
        .send({ user: "" });
      expect(response.status).toEqual(expected);
    });
    it("should return json", async () => {
      const response = await request(server).post("/name");
      expect(response.type).toEqual("application/json");
    });
  });
  describe("(/users/:id) to delete user", () => {
    it("should return message: user deleted", async () => {
      const expected = { message: "2 has been deleted" };
      const response = await request(server).delete("/users/2");
      expect(response.body).toEqual(expected);
    });
    it("should return json", async () => {
      const response = await request(server).delete("/users/2");
      expect(response.type).toEqual("application/json");
    });
    it("should return code for fine 200", async () => {
      const expected = 200;
      const response = await request(server).delete("/users/2");
      expect(response.status).toEqual(expected);
    });
  });
});
