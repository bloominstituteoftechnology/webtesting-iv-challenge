const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./User');

describe('User model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/servertestdb')
      .then(console.log('connected to db'));
  });
  afterEach(() => {
    return User.remove();
  });
  afterAll(() => {
    return mongoose.disconnect();
  });
  it("should hash the password before saving the user", async () => {
    const user = { username: "tylar", password: "pass" };

    const savedUser = await User.create(user); // new + save

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });

  describe('Delete user', () => {

  });
;})