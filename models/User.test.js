const mongoose = require('mongoose');
const User = require('./User');

describe('user model', () => {
  const testUser = {};

  beforeAll(() => {
    testUser.username = 'dannyv';
    testUser.password = 'password';
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
    const savedUser = await User.create(testUser);
    const correctPassword = await savedUser.isValidPassword(testUser.password);
    const incorrectPassword = await savedUser.isValidPassword(
      `not${correctPassword}`
    );
    expect(correctPassword).toBeTruthy();
    expect(incorrectPassword).toBeFalsy();
  });
});
