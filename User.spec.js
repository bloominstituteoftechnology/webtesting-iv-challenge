const mongoose = require('mongoose');

const User = require('./User');
let _id;

describe('User model', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost/servertesting');
  });

  afterAll(() => {
    mongoose.disconnect();
  });
  
  it('should hash the password saving a new user', async () => {
    const brandon = { username: 'Brandon', password: 'pass' };
    const newUser = await User.create(brandon);
    
    _id = newUser._id;
    
    expect(newUser.username).toEqual(brandon.username);
    expect(newUser.password).not.toEqual(brandon.password);
  });

  it('should delete a user', async () => {
    console.log(_id);
    const user = { username: 'Brandon', password: 'pass' };
    const deleteUser = await User.findByIdAndDelete({ _id });

    expect(deleteUser.username).toEqual('Brandon');
  })
})