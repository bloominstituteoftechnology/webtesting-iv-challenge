const request = require("supertest");

const server = require("./server");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./User");

describe("User model", () => {
  let UserId;
  beforeAll(() => {
    // User.create({ username: "mark", password: "milk" });
    return mongoose
      .connect("mongodb://localhost/testingdb")
      .then(console.log("connected to test db"));
  });

  // return User.create({ username: "mark", password: "milk" });
  beforeEach(done => {
    const newUser = new User({
      username: "sada",
      password: "kia"
    });
    newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
      } else {
        UserId = savedUser._id;
        console.log(UserId);
      }
      done();
    });
  });

  afterEach(() => {
    return User.remove();
  });

  afterAll(() => {
    return User.remove().then(() => mongoose.disconnect());
  });

  it("should hash the password before saving the user", async () => {
    const user = { username: "mike", password: "milk" };

    const savedUser = await User.create(user); // new + save

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });

  describe("server", () => {
    it("should return Ok and a json object from the index route", async () => {
      const expectedBody = { api: "running!" };

      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual(expectedBody);
    });
    it("should return all users from database and ok", async () => {
      const response = await request(server).get("/users");

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      // expect(response.body).toHaveLength(2);
    });
    it("should add a new user after making post request", async () => {
      const user = { username: "Jorge", password: "best" };
      const response = await request(server)
        .post("/users")
        .send(user);

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("password");
    });
    it("should update user", async () => {
      const update = { username: "tada", password: "kia" };
      const response = await request(server)
        .put(`/users/${UserId}`)
        .send(update);

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("password");
      expect(response.body.username).toEqual(update.username);
    });
    it("should remove user", async () => {
      const response = await request(server).delete(`/users/${UserId}`);

      expect(response.body.status).toEqual("success");
    });
  });
});
