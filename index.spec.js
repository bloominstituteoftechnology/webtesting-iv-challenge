const request = require("supertest");
const server = require("./api/server");

describe("server", () => {
  describe("GET /", () => {
    it("should return status code 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  }); // get

  describe("POST /api/:user", () => {
    it("should return status code 201", async () => {
      const user = "Harry";
      const response = await request(server)
        .post(`/api/${user}`);
      expect(response.status).toBe(201);
    });

    it("should return a message", async () => {
      const user = "Harry";
      const house = "Gryffindor";
      const expected = {
        Message: "Hello Harry, you belong to Gryffindor."
      };
      const response = await request(server)
        .post(`/api/${user}`)
        .send({ house });
      expect(response.body).toEqual(expected);
    });
  }); // post

  describe('DELETE /api/:user', () => {
    it("should return status code 200", async () => {
      const user = "Harry";
      const response = await request(server)
        .delete(`/api/${user}`);
      expect(response.status).toBe(200);
    });

    it("should return a message", async () => {
      const user = "Harry";
      const expected = {
        Message: "Harry was removed."
      };
      const response = await request(server)
        .delete(`/api/${user}`)
      expect(response.body).toEqual(expected);
    });
  }); // delete
}); // server
