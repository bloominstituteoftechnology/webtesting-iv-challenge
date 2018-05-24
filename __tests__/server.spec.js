const request = require("supertest");

const server = require("../server");

describe("server", () => {
  describe("index route", () => {
    const expectedBody = { api: "running!" };

    it("should return server OK (200)", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });
    it("should return json object from index route", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual(expectedBody);
    });
  });
  
});
