const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./User");

describe("user model", () => {
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

  it("should hash the pw before saving the user", async () => {
    const user = { username: "frodo", password: "irrelevant" };

    const savedUser = await User.create(user);

    expect(savedUser.password).not.toEqual(user.password);
  });
  it("should check the password hash length using the static function", async () => {
    const user = { username: "frodo", password: "irrelevant" };

    const savedUser = await User.create(user);

    expect(savedUser.password).toHaveLength(60);
  });
  it("should return the username using the static function", async () => {
    const user = { username: "frodo", password: "irrelevant" };

    const savedUser = await User.create(user);

    expect(savedUser.username).toEqual(user.username);
  });
});
