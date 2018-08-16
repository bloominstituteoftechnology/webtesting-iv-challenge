const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("root endpoint (/)", () => {

    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server).get("/");
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/");
      expect(res.type).toEqual("application/json");
    });

    it("should return object that looks like {api:running} ", async () => {
      const expected = { api: "running" };
      const res = await request(server).get("/");
      expect(res.body).toEqual(expected);
    });
  });

  describe("GET endpoint(/countries)", () => {

    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server).get("/countries");
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/countries");
      expect(res.type).toEqual("application/json");
    });

    it("should return object that looks like expected ", async () => {
      const expected = { countries: "here are some countries" };
      const res = await request(server).get("/countries");
      expect(res.body).toEqual(expected);
    });
  });

  describe("POST endpoint (/countries)", () => {

    it("should return status code 201 created", async () => {
      const expected = 201;
      const res = await request(server)
        .post("/countries")
        .send({ country: "USA" });
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
        const res = await request(server).get("/countries");
        expect(res.type).toEqual("application/json");
      });

    it("should return created country", async () => {
      const expected = { country: "USA" };
      const res = await request(server)
        .post("/countries")
        .send({ country: "USA" });
      expect(res.body).toEqual(expected);
    });

    it('should return status code 422 if there is no country', async () => {
        const expected = 422;
        const res = await request(server)
            .post('/countries')
            .send({country:""});

            expect(res.status).toEqual(expected) 
    });
    it('should return error message if there is no country', async () => {
        const expected = {message: `need country bro`};
        const res = await request(server)
            .post('/countries')
            .send({country:""});

            expect(res.body).toEqual(expected) 
    });
  });

  describe("DELETE endpoint (/countries/:country)", () => {
    
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server).delete("/countries/:country");
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
        const res = await request(server).delete("/countries/USA");
        expect(res.type).toEqual("application/json");
      });

    it("should return message that says `Success in deleting {country}`", async () => {
      const expected = { message: `Success in deleting USA` };

      const res = await request(server).delete("/countries/USA");

      expect(res.body).toEqual(expected);
    });
  });
});
