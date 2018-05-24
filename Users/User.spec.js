const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./User");

describe("A new user", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testing-users")
      .then(console.log("connected to test db"));
  });

  afterEach(() => {
    return User.remove();
  });

  it("should have a username and password", async () => {
    const user = { username: "frodo", password: "mordor" };
    const savedUser = await User.create(user);

    expect(typeof savedUser.username).toBe("string");
    expect(savedUser.username.length).toBeGreaterThan(0);
    expect(typeof user.password).toBe("string");
    expect(user.password.length).toBeGreaterThan(0);
  });

  it("should hash the password before saving the user", async () => {
    const user = { username: "frodo", password: "irrelevant" };
    const savedUser = await User.create(user);

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });
});
