const mongoose = require("mongoose");
const bcrypt = require("");

const User = require("../users/User");

describe("User model", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testingdb")
      .then(console.log("connected to test db"));
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
});
