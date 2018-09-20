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
        .post("/classes")
        .send(test)
        .then(res => {
          response = res;

          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return an id from the post route", () => {
      let response;
      const test = {
        name: "FSW12",
        track: "Full Stack Web"
      };

      return request(server)
        .post("/classes")
        .send(test)
        .then(res => {
          response = res;

          expect(response.type).toEqual("application/json");
        });
    });
  });

  describe("put route", () => {
    it("should return an OK status code", () => {
      const expectedStatusCode = 200;

      let response;
      let test = { track: "iOS" };

      return request(server)
        .put("/classes/1")
        .send(test)
        .then(res => {
          response = res;

          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return '1'", () => {
      let response;
      let test = { track: "iOS" };

      return request(server)
        .put("/classes/2")
        .send(test)
        .then(res => {
          response = res;

          expect(response.body).toEqual(1);
        });
    });
  });

  describe("delete route", () => {
    it("should return an OK status code", () => {
      const expectedStatusCode = 200;

      let response;

      return request(server)
        .delete("/classes/1")
        .then(res => {
          response = res;

          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return '1'", () => {
      let response;

      return request(server)
        .delete("/classes/2")
        .then(res => {
          response = res;

          expect(response.body).toEqual(1);
        });
    });
  });
});
