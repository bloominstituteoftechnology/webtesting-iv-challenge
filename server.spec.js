const server = require('./server.js');
const request = require('supertest'); 



describe("server.js", () => {
    it("runs the test", () => {
      expect(true).toBeTruthy();
    });
    describe("GET /foods", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/foods");
        expect(response.status).toEqual(200);
      });
      it('should return dishes ', async () => {
        const response = await request(server).get("/foods");
        const expectedBody =[
          { id: 0, film: "burger" },
          { id: 1, film: "pizza" }
        ];
        expect(response.body).toEqual(expectedBody);
      });
      it("should return JSON ", async () => {
        const response = await request(server).get("/foods");
        expect(response.type).toEqual("application/json");
      });
    });
    describe("POST /foods", () => {
      it("should return a food", async () => {
        const response = await request(server)
          .post("/foods")
          .send({
              dish: "chili" 
          });
        const expectedBody = [
          { id: 0, dish: "burger" },
          { id: 1, dish: "pizza" },
          { id: 2, dish: "chili" }
        ];
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expectedBody);
      });
    });
    describe("DELETE /foods/:id", () => {
      it("should delete the passed in id", async () => {
        const response = await request(server).delete("foods/2");
        const body = [
          { id: 0, dish: "burger" },
          { id: 1, dish: "pizza" }
        ];
        expect(response.body).toEqual({ movie: body });
      });
      it("should return 404 if the id does not exist", async () => {
        const response = await request(server).delete("/foods/20101");
        expect(response.status).toBe(404);
      });
    });
  });