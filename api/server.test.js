//testing set up

const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig");

describe("the route handlers", () => {
   it("responds with 200", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
   });
});