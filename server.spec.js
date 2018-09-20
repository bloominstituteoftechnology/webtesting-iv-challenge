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

  describe("POST Routes", () => {
    it("add a new team to the teams object", async () => {
      const response = await request(server)
        .post("/teams")
        .send({ name: "Chelsea" });

      const expectedBody = [
        { id: 0, name: "Manchester United" },
        { id: 1, name: "Liverpool" },
        { id: 2, name: "Arsenal" },
        { id: 3, name: "Chelsea" }
      ];

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("DELETE Routes", () => {});
});
