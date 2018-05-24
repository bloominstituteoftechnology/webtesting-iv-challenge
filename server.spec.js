const request = require("supertest");
const mongoose = require("mongoose");
const User = require("./users/User");

const server = require("./server");

describe("server", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/yasinsdb")
      .then(console.log("connected to test db"));
  });

  beforeEach(() => {
    // return User.remove();
  });

  afterEach(() => {
    return User.remove();
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it("should return Ok and a json object from the index route", async () => {
    let expectedBody = { api: "running!" };

    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(expectedBody);
  });

  it("should should return Ok and return a json object of the new user created", async () => {
    const user = { username: "frodo", password: "irrelevant" };

    const response = await request(server)
      .post("/create")
      .send(user);
    expect(response.status).toEqual(200);
  });
  it("should respond with an error of 500 if the username is not provided", async () => {
    const user = { password: "irrelevant" };
    const response = await request(server)
      .post("/create")
      .send(user);
    expect(response.status).toEqual(500);
  });
  it("should respond with an error of 500 if the pw is not provided", async () => {
    const user = { username: "frodo" };
    const response = await request(server)
      .post("/create")
      .send(user);
    expect(response.status).toEqual(500);
  });
  it("should respond with an error of 500 if the username is not provided", async () => {
    const user = { password: "irrelevant" };

    const response = await request(server)
      .post("/create")
      .send(user);
    expect(response.status).toEqual(500);
  });
  it("should reroute to google.com when it hits this end point", async () => {
    let expectedErr = 302;
    let expectedUrl = "https://google.com";

    const response = await request(server).get("/reroute");
    expect(response.status).toEqual(302);
    expect(response.header.location).toEqual(expectedUrl);
  });
});
