const request = require("supertest");
const mongoose = require("mongoose");

const server = require("../server");

describe("server", () => {
  afterAll(() => {
    return mongoose.disconnect();
  });

  describe("index route", () => {
    it("should return server OK (200)", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });
    it("should return json object from index route", async () => {
      const response = await request(server).get("/");
      const expectedBody = { api: "running!" };

      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("/api/user", () => {
    beforeAll(() => {
      return mongoose
        .connect("mongodb://localhost/testingdb")
        .then(console.log("connected to test db"));
    });

    it("should return server OK (200)", async () => {
      const response = await request(server).get("/api/user");
      expect(response.status).toEqual(200);
    });
  });
});
