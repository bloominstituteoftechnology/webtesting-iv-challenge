const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./UserModel.js');

describe('Usermodel', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test').then(console.log('user db'));
  });

  afterEach(() => {
    return User.remove();
  });
  
  afterAll(() => {
    return mongoose.disconnect();
  });

  it('should hash the password', async () => {
    const user1 = { username: 'thomas', password: 'pass' };
    const savedUser = await User.create(user1);
    expect(savedUser.username).toEqual(user1.username);
    expect(savedUser.password).not.toEqual(user1.password);
    expect(savedUser.password).toHaveLength(60);
  });
});
