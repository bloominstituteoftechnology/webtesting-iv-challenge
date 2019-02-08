const request = require("supertest");
const db = require("./data/dbConfig");
const server = require("./server");

afterEach(async () => {
  await db("movies").truncate();
});

describe("POST/movies endpoint", () => {
    it("should respond with status code 201 created", async () => {
      let body = { movie: "The Godfather" };
      let res = await request(server)
        .post('/movies')
        .send(body);
      expect(res.status).toBe(201);
    });
    it("should return the id of the item created", async () => {
      let body = { movie: "The Godfather" };
      let res = await request(server)
        .post('/movies')
        .send(body);
      expect(res.body).toEqual([1]);
    });
  });

  describe("DELETE /movies/:id endpoint", () => {
    it("should delete a user from the database", async () => {
      let response = await request(server).delete(`/movies/1`);

      expect(response.status).toBe(200);
    });

    it("should return the number of item deleted", async () => {
      let res = await request(server)
        .post('/movies')
        .send({ movie: "The Godfather" });
      res = await request(server).delete("/movies/1");
      expect(res.body).toBe(1);
    });
  });
