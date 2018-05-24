const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./User");

describe("A new user", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testing-users")
      .then(console.log("connected to test db"));
  });

  beforeEach(async () => {
    const user = { username: "frodo", password: "irrelevant" };
    const savedUser = await User.create(user);
  })

  afterEach(() => {
    return User.remove();
  });

//   it("should have a username and password", () => {
//     expect(typeof username).toBe("string");
//     expect(username.length).toBeGreaterThan(0)
//     expect(typeof password).toBe("string");
//     expect(password.length).toBeGreaterThan(0)
//   });

  it("should hash the password before saving the user", async () => {
    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });
});
