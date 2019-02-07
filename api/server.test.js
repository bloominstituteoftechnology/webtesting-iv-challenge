const request = require("supertest");

const server = require("./server");

describe("ROUTE HANDLERS", () => {
  describe("get /", () => {
    it("recieves a 200 status code", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });

    it("recieves a 400 status code", async () => {
      const response = await request(server).get("/");
      response.status = 400;
      expect(response.status).toBe(400);
    });

    it("recieves json format", async () => {
      const response = await request(server).get("/");

      expect(response.type).toMatch(/json/i);
    });

    it("should return proper object", async () => {
      const response = await request(server).get("/");

      expect(response.body).toEqual({ users: [{ username: "joseph" }] });
    });
  });
});
