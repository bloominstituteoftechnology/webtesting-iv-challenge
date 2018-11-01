const mongoose = require("mongoose");
const User = require("../Models/UserModel");

describe("User Model", () => {
  beforeAll(() => {
    return mongoose.connect("mongodb://localhost/testdb");
  });
  afterEach(() => {
    return User.remove();
  });
  afterAll(() => {
    return mongoose.disconnect();
  });
  it("should hash the password before saving the user", async () => {
    const Fred = { username: "Fred", password: "Flintstone" };

    const savedUser = await User.create(Fred);

    expect(savedUser.username).toEqual(Fred.username);
    expect(savedUser.password).not.toEqual(Fred.password);
    expect(savedUser.password).toHaveLength(60);
  });
});
