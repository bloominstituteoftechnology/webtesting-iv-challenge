const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("index route", () => {
    it("should return an OK status code from the index route", () => {
      const expectedStatusCode = 200;

      let response;
      return request(server)
        .get("/")
        .then(res => {
          response = res;

          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return a JSON object fron the index route", async () => {
      const expectedBody = { api: "running" };

      let response;
      return request(server)
        .get("/")
        .then(res => {
          response = res;

          expect(response.body).toEqual(expectedBody);
        });
    });

    it("should return a JSON object fron the index route", () => {
      let response;
      return request(server)
        .get("/")
        .then(res => {
          response = res;

          expect(response.type).toEqual("application/json");
        });
    });
  });

  describe("get route", () => {
    it("should return an OK status code", () => {
      const expectedStatusCode = 200;

      let response;
      return request(server)
        .get("/classes")
        .then(res => {
          response = res;

          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return a JSON object fron the index route", () => {
      let response;
      return request(server)
        .get("/classes")
        .then(res => {
          response = res;

          expect(response.type).toEqual("application/json");
        });
    });
  });

  describe("post route", () => {
    it("should return an OK status code", () => {
      const expectedStatusCode = 201;

      let response;
      const test = {
        name: "FSW12",
        track: "Full Stack Web"
      };

      return request(server)
        .post("/classes", test)
        .then(res => {
          response = res;

          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return a JSON object fron the index route", () => {
      let response;
      const test = {
        name: "FSW12",
        track: "Full Stack Web"
      };

      return request(server)
        .post("/classes", test)
        .then(res => {
          response = res;

          expect(response.type).toEqual("application/json");
        });
    });
  });
});
