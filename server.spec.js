const request = require("supertest");

const server = require("./server.js");

describe("server.js tests", () => {
  it("runs", () => {
    expect(true).toBeTruthy();
  });

  describe("GET Routes", () => {
    it("GET to / returns a 200 (OK) status code", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });

    it("GET to /teams returns status code 200", async () => {
      const response = await request(server).get("/teams");
      expect(response.status).toBe(200);
    });
  });

  describe("POST Routes", () => {});
  describe("DELETE Routes", () => {});
});
