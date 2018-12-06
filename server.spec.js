const server = require("./server.js");
const request = require("supertest");

describe("server.js", () => {
  it("runs the test", () => {
    expect(true).toBeTruthy();
  });
  describe("GET /movies", () => {
    it("returns a 200 (OK) status code", async () => {
      const response = await request(server).get("/movies");
      expect(response.status).toEqual(200);
    });
    it('should return films ', async () => {
      const response = await request(server).get("/movies");
      const expectedBody =[
        { id: 0, film: "Romy and Michele Highschool Reunion" },
        { id: 1, film: "Halloween" }
      ];
      expect(response.body).toEqual(expectedBody);
    });
    it("should return JSON ", async () => {
      const response = await request(server).get("/movies");
      expect(response.type).toEqual("application/json");
    });
  });
  describe("POST /movies", () => {
    it("should return a movie", async () => {
      const response = await request(server)
        .post("/movies")
        .send({
            film: "Eighth Grade" 
        });
      const expectedBody = [
        { id: 0, film: "Romy and Michele Highschool Reunion" },
        { id: 1, film: "Halloween" },
        { id: 2, film: "Eighth Grade" }
      ];
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expectedBody);
    });
  });
  describe("DELETE /movies/:id", () => {
    it("should delete the passed in id", async () => {
      const response = await request(server).delete("movies/2");
      const body = [
        { id: 0, film: "Romy and Michele Highschool Reunion" },
        { id: 1, film: "Halloween" }
      ];
      expect(response.body).toEqual({ movie: body });
    });
    it("should return 404 if the id does not exist", async () => {
      const response = await request(server).delete("/movies/20101");
      expect(response.status).toBe(404);
    });
  });
});
