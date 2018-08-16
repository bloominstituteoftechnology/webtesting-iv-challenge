const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("GET routes", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("application/json");
    });

    it("should return body", async () => {
      const expected = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expected);
    });
  });

  describe("POST routes", () => {
    it('should return {hello: "name"} when provided a name inside the body.', async () => {
      const expected = { hello: "Bilbo" };
      const response = await request(server)
        .post("/greet")
        .send({ name: "Bilbo" });
      expect(response.body).toEqual(expected);
    });

    it("should return {hello: name} when provided a name as a parameter", async () => {
      const expected = { hello: "Frodo" };
      const response = await request(server).post("/greet/Frodo");

      expect(response.body).toEqual(expected);
    });
  });

  describe("DELETE routes", () => {
    it("should delete a name when provided the right id", async () => {
      const response = await request(server).delete("/greet/Frodo");
      expect(response.body).toEqual("Frodo Deleted");
    });
  });
});
