const request = require("supertest");
const server = require("./server.js");

describe('server.js', () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe('GET /', () => {
    it("returns a 200 (OK) status code", async () => {

      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("returns a json object", async ()=> {
      const response = await request(server).get("/");

      expect(response.type).toEqual('application/json');
    })
  })

  describe('POST /', () => {
    const pupper = { name: 'Fuzzy Lazy Pupper'};

    it("returns a 201 status code", async () => {

      const response = await request(server).post("/")
      .send(pupper);

      expect(response.status).toEqual(201);
    });

    it("returns the id of the new item in an array", async () => {
      const response = await request(server).post("/")
      .send(pupper);

      expect(response.body).toEqual(2);
    });
  });

  describe('DELETE /', () => {
    it("returns a 201 status code", async () => {

      const response = await request(server).delete("/1");

      expect(response.status).toEqual(201);
    });

    it("returns a count of the objects deleted, which will be 1", async () => {
      const response = await request(server).delete("/1");
      expect(response.body).toEqual(1);
    });
  })
})
