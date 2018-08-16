const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET: unknown endpoint (/???)", () => {
    it("Should return status code 404 file not found", async () => {
      const expected = 404;

      const res = await request(server).get("/notsmurfs");
      expect(res.status).toEqual(expected);
    });
  });

  describe("GET: smurf endpoint (/smurfs)", () => {
    it("should return status code 200 ok", async () => {
      const expected = 200;

      const res = await request(server).get("/smurfs");
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const expected = '[{"name":"Brainey","age":200,"height":"5cm"}]';
      const res = await request(server).get("/smurfs");

      expect(res.text).toEqual(expected);
    });
  });

  //   describe("POST: smurf endpoint (/smurfs)", () => {
  //       it("should return status code 200 ok", async () => {
  //           const expected = 200;

  //           const res = await request(server).post("/smurfs");
  //           expect(res.status).toEqual(expected);
  //       })
  //   })
});
