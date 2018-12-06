const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  it("runs tests", () => {
    expect(true).toBeTruthy();
  });
  // runs tests
  describe("**POST /foods***", () => {
    it("should post a food", async () => {
      const name = "cabbage";
      const expected = { message: "cabbage has been added." };

      const response = await request(server)
        .post("/foods")
        .send({ name });
      expect(response.body).toEqual(expected);
    }); // should post a food

    it("should return a 200 code if a new game is posted successfully", async () => {
      const newFood = {
        name: "IM A REAL FODO"
      };

      const response = await request(server)
        .post("/foods")
        .send(newFood);
      expect(response.status).toBe(200);
    }); // should return a 200 code if a new food is posted successfully
  }); // post foods

  describe("*GET /foods*", () => {
    it("should return foods", async () => {
      const response = await request(server).get("/foods");
      expect(response.type).toBe("application/json");
    }); // list of foods

    it("should return a 200 code if a food is retrieved successfully", async () => {
      const response = await request(server).get("/foods");
      expect(response.status).toBe(200);
    }); // should return a 200 code if a food is retrieved successfully
  });
});
