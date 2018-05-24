const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // yarn added this

const User = require('./User');

describe('User model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'));
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

  it('should hash the password before saving the user', async () => {
    const user = { username: 'frodo', password: 'irrelevant' };

    const savedUser = await User.create(user); // new + save
    console.log(savedUser);
    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });
});