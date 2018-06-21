const request = require("supertest");
const server = require("../server");

describe("userController", () => {
  describe("post request to registration route", () => {
    let user = {
      username: "Amy",
      password: "password"
    };
    it("should return a 201 status code if username and password are provided", async () => {
      const expectedStatusCode = 200; // really expect 201

      const response = await request(server)
        .post("/register")
        .send(user);

      expect(response.status).toEqual(expectedStatusCode);
      expect(response.type).toEqual("application/json");
    });
  });
  describe("post request with invalid input", () => {
    let user = {
      username: "Jack"
    };
    it("should give a 400 status code and not save the user if username or password is missing", async () => {
      const expectedStatus = 400;

      const response = await request(server)
        .post("/register")
        .send(user);

      expect(response.status).toEqual(expectedStatus);
    });
  });
  describe("post request to login route", () => {
    let user = {
      username: "Amy",
      password: "password"
    };
    it("should return a 200 status code if username and password are provided", async () => {
      const expectedStatusCode = 200; // really expect 201

      const response = await request(server)
        .post("/login")
        .send(user);

      expect(response.status).toEqual(expectedStatusCode);
      expect(response.type).toEqual("application/json");
    });
  });
  describe("post request with invalid input", () => {
    let user = {
      username: "Jack"
    };
    it("should give a 400 status code and not save the user if username or password is missing", async () => {
      const expectedStatus = 400;

      const response = await request(server)
        .post("/register")
        .send(user);

      expect(response.status).toEqual(expectedStatus);
    });
  });
});
