const mongoose = require('mongoose');
const User = require('./User');

describe('user model', () => {
  const testUser = {
    username: 'dannyv',
    password: 'password'
  };

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testdb');
  });

  afterEach(() => {
    return User.remove();
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it('should hash password before saving the user', async () => {
    const savedUser = await User.create(testUser);
    expect(savedUser.password).not.toBe(testUser.password);
  });

  it('should have method isValidPassword that checks if given password is correct', async () => {
    const correctPassword = testUser.password;
    const incorrectPassword = `not${correctPassword}`;
    const savedUser = await User.create(testUser);
    expect(savedUser.isValidPassword(correctPassword)).toBeTruthy();
    expect(savedUser.isValidPassword(incorrectPassword)).toBeFalsy();
  });
});
