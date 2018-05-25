const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./User");

describe("User model", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testingdb")
      .then(console.log("connected to testingdb"));
  });

  beforeEach(() => {});

  afterEach(() => {
    return User.remove();
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it("should hash the password before saving the user", async () => {
    const user = { username: "frodo", password: "bagginsbaggins" };

    const savedUser = await User.create(user);

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });

  it("username and password should be strings", async () => {
    const user = { username: "frodo", password: "bagginsbaggins" };

    const savedUser = await User.create(user);

    expect(typeof savedUser.username).toEqual("string");
    expect(typeof savedUser.password).toEqual("string");
  });
});
