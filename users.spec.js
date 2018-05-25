const mongoose = require('mongoose');
const User = require('./usersModel.js');
const bcrypt = require('bcrypt');




describe('testing users', () => {
  beforeAll(() => {
    return (mongoose
      .connect('mongodb://localhost:27017/testingDb')
      .then(console.log('connected to testingDb'))
    );
  });
  beforeEach(() => {

  });

  afterEach(() => {

  });
  afterAll(() => {
    return User.remove();
  });

  it('should hash the password before saving the user', async () => {
    const obj = { username: 'zxxxx', password: 'lambda' };

    const savedUser = await User.create(obj); // new + save
    // console.log('methods', savedUser.checkPassword)
    expect(savedUser.password).not.toEqual(obj.password);
    expect(savedUser.password).toHaveLength(60);
    expect(typeof savedUser.checkPassword).toBe('function')
  });

  it('testing for delete ', async () => {
    const id = "5b0792efb152a9a0eec4ce87";

    const newUser = await User.findById({ _id: id }).remove();
    console.log(newUser);

    expect(User).not.toContain(newUser)


  })

})