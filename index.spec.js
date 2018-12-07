const request = require("supertest");
const server = require("./index");

describe("index.js", () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  describe("/ route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });

  describe("post", () => {
    it("should return id", async () => {
      let response = await request(server)
        .post("/api/thing")
        .send({ this: "stinks" });
      response = JSON.parse(response.text)[0];

      expect(response).toBeGreaterThan(1);
    });

    it("should add a thing", async () => {
      let before = await request(server).get("/api/thing");
      before = JSON.parse(before.text).length;

      await request(server)
        .post("/api/thing")
        .send({ this: "stinks" });
      let after = await request(server).get("/api/thing");
      after = JSON.parse(after.text).length;
      expect(after).toBe(before + 1);
    });
  });

  describe("delete", () => {
    let response;
    beforeAll(async () => {
      response = await request(server).delete(`/api/thing/stinks`);
    });

    it("should return deleted", async () => {
      expect(response.text).toBe("deleted");
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });
  });
});
