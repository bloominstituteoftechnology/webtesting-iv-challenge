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
  it("should be invalid (return error) if name is empty", async () => {
    const user = new User();

    // checks for error in validation
    user.validate(err => {
      expect(err.errors).toExist;
    });
    // checks to see if password is not saved (nothing there to begin with)
    expect(user.password).toBeEmpty;
  });

  it("should hash the password before saving the user", async () => {
    const user = { username: "jasonbourne", password: "identity" };

    const savedUser = await User.create(user); // new + save

    // needless check for error to not exist
    savedUser.validate(err => {
      expect(err).not.toExist;
    });

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });
});
