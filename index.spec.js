const request = require("supertest");
const server = require("./api/server.js");

describe("server.js", () => {
  describe("index route", () => {
    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object fron the index route", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });

    it("should return a JSON object from the student database route", async () => {
      const response = await request(server).get("/api/students");
      expect(response.type).toEqual("application/json");
    });
  });

  describe("studentDb routes", () => {
    describe("POST /api/students ", () => {
      it("should return status of 201", () => {
        return request(server)
          .post(`/api/students`)
          .send({ name: "lily", email: "Ana" })
          .then(res => {
            expect(res.status).toEqual(201);
          });
      });

      it("should return the student name", async () => {
        let response = await request(server)
          .post("/api/students")
          .send({ name: "James", email: "jj@gmail.com" });
        expect(response.body).toEqual({ name: "James" });
      });
    });

    describe("DELETE /api/students:id ", () => {
      it("should return a status code of 201", async () => {
        let response = await request(server).delete("/api/students:3");
        expect(response.status).toBe(201);
      });

      it("should return error message if i.d. is not present", async () => {
        const id = 432;
        const response = await request(server)
          .delete(`/api/students/${id}`)
          .send({ id });
        expect(response.body).toEqual({
          message: "The student with the specified ID does not exist."
        });
      });
    });
  });
});
