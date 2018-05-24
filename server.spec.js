const request = require("supertest");
const mongoose = require("mongoose");
const server = require("./server");
const User = require("./users/Users");

describe("server", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testingdb")
      .then(console.log("connected to test db"));
  });

  beforeEach(() => {});
  afterEach(() => {
    return User.remove();
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it("should return Ok and a json object from the index route", async () => {
    const expectedBody = { api: "running!" };

    const response = await request(server).get("/");

    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(expectedBody);
  });

  test("It should response the DEL method", () => {
    return request(server)
      .delete("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  
  test("It should response the DEL user id", async () => {
    const user = { username: "frodo", password: "irrelevant" };

    const savedUser = await User.create(user); // new + save

    return request(server)
      .delete(`/${savedUser._id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
