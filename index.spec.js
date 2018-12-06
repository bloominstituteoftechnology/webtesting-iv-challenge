const request = require("supertest");

const server = require("./api/server");

describe("server.js", () => {
  describe("/", () => {
    it("should keep me sane by returning a 200 code", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/");

      expect(response.type).toBe("application/json");
    });

    it('should return with a body of {api: "running"}', async () => {
      let response = await request(server).get("/");
      expect(response.body).toEqual({ api: "running" });
    });
  });

  describe("GET route /hobbits", () => {
    it("returns the length of the current mockDB", async () => {
      let response = await request(server).get("/hobbits");
      expect(response.body.length).toBe(1);
    });
  });

  describe("POST route /hobbits", () => {
    it("adds the new hobbit to the mockDB", async () => {
      await request(server)
        .post("/hobbits")
        .send({ name: "Merry" });
      let response = await request(server).get("/hobbits");
      expect(response.body.length).toBe(2);
    });

    it("returns a status code 201 if successful", async () => {
      let response = await request(server)
        .post("/hobbits")
        .send({ name: "Frodo" });
      expect(response.status).toEqual(201);
    });
  });

  describe("DELETE route /hobbits", () => {
    it("deletes the passed hobbit", async () => {
      expect((await request(server).get("/hobbits")).body).toHaveLength(3);
      let response = await request(server)
        .delete("/hobbits")
        .send({ name: "Samwise" });
      expect(response.body).toHaveLength(2);
    });

    it("returns a status code 200", async () => {
      let response = await request(server)
        .delete("/hobbits")
        .send({ name: "Samwise" });
      expect(response.status).toBe(200);
    });
  });
});
