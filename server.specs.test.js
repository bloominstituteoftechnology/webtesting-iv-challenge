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

    it("should return a 200 status code when deleting a name", async () => {
      const response = await request(server).delete("/greet/Bilbo");
      expect(response.status).toEqual(200);
    });
  });

  describe("PUT routes", () => {
    it("should edit a name when provided inside the body.", async () => {
      const expected = { name: "Toby", id: 1 };
      const response = await request(server)
        .put("/greet/1")
        .send({ name: "Toby", id: 1 });
      expect(response.body).toEqual(expected);
    });

    it("should send a 400 error when nothing is inputted in the response body", async () => {
      const response = await request(server).put("/greet/2");
      expect(response.status).toEqual(400);
    });
  });
});
