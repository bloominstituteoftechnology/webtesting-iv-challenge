// /users/User.spec.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // yarn added this
const request = require("supertest");
const User = require("./Users");

describe("User model", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testingdb")
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

  it("should hash the password before saving the user", async () => {
    const user = { username: "frodo", password: "irrelevant" };

    const savedUser = await User.create(user); // new + save

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });

  describe("DELETE user", () => {
    it("should delete existing user successfully",  () => {
      const user = { username: "frodo", password: "irrelevant" };
      // const savedUser = await User.create(user); // new + save
      // const { id } = savedUser.id; // new + save
      // console.log(savedUser._id);
        request(User)
        .delete("/")
        .then(res => {
          const { success, message } = res.body;
          expect(success).toBeTruthy();
          expect(message).toBe("Delete successfully");
        })
        .catch(err => console.log(err));
    });
  });
});
