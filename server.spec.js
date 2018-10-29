const server = require("./server");
const request = require("supertest");

describe("Server", () => {
  describe("GET to /", () => {
    it("should return a status code of 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(200);
    });
    it("should return a response body", async () => {
      const expectedBody = {
        users: [
          { id: 1, name: "Mike", email: "mike@test.com" },
          { id: 2, name: "Katia", email: "katia@test.com" },
          { id: 3, name: "Grant", email: "grant@test.com" }
        ]
      };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });
    it("should return a JSON object", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });
  describe("POST to /", () => {
    it("should return a status code of 201", async () => {
      const response = await request(server)
        .post("/")
        .send({ id: 4, name: "Luis", email: "luis@test.com" });
      expect(response.status).toEqual(201);
    });
    it("should return a status code of 500", async () => {
      const response = await request(server)
        .post("/")
        .send({ id: 4, name: "Luis" }); //no name
      expect(response.status).toEqual(500);
    });
    it("should return posted data in the response body", async () => {
      const expectedBody = { id: 4, name: "Luis", email: "luis@test.com" };
      const response = await request(server)
        .post("/")
        .send(expectedBody);
      expect(response.body).toEqual(expectedBody);
    });
    it("should return a JSON object", async () => {
      const expectedBody = { id: 4, name: "Luis", email: "luis@test.com" };
      const response = await request(server)
        .post("/")
        .send(expectedBody);
      expect(response.type).toBe("application/json");
    });
  });
  describe("DELETE /:id", () => {
    it("should return a status code of 200 when successfully deleted", async () => {
      const response = await request(server).delete("/1");
      expect(response.status).toEqual(200);
    });
    it("should return the ID of the deleted item", async () => {
      const expectedBody = { id: 1 };
      const response = await request(server)
        .delete("/1")
        .send({ id: "1" });
      expect(response.body).toEqual({ id: "1" });
    });
    it("should return a JSON object", async () => {
      const response = await request(server)
        .delete("/1")
        .send({ id: "1" });
      expect(response.type).toBe("application/json");
    });
  });
  describe('PUT to /:id', () => {
    it('should successfully return status code 200', async () => {
        const response = await request(server).put('/1').send({name: 'Michael'});
        expect(response.status).toEqual(200);
    });
    it('should return a status code of 500 if nothing is passed in', async () => {
        const response = await request(server).put('/1').send({});
        expect(response.status).toEqual(500);
    });
    it('should return the updated user', async () => {
        const expectedBody = { id: 1, name: "Michael", email: "mike@test.com" };
        const response = await request(server).put('/1').send(expectedBody);
        expect(response.body).toEqual(expectedBody);
    });
    it('should return a JSON object', async () => {
        const response = await request(server).put('/1').send({name: 'Michael'});
        expect(response.type).toBe('application/json');
    });
  });
});
