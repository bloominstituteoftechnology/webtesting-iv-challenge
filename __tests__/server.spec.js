const request = require("supertest");
const server = require("../server.js");
const fighters = require("../data/fighters.js");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /", () => {
    it("returns a 200 (OK) status code", async () => {
      // get access to the server
      // use supertest to make a GET to the server
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("correctly passing req.body check", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
  describe("DBZ Endpoints", () => {
    describe("GET fighters", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/fighters");

        expect(response.status).toEqual(200);
      });
      it("should display a list of all fighters", async () => {
        const response = await request(server).get("/fighters");

        expect(response.body).toEqual(fighters);
      });
    });
  });
});
