const mongoose = require('mongoose');
const User = require('./User')


 describe('user', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testdb')
  });

  afterEach(() => {
    return User.remove();
  })

  afterAll(() => {
    return mongoose.disconnect();
  })
  
  it('tests if we have created anyting', async () => {
    const username = {username: 'steve', password: 'MrSteve'};
    const savedUser = await User.create(username);

    const expectedStatusCode = 200
    
    expect(savedUser.username).toEqual(username.username);
    // expect(savedUser.status).toEqual(expectedStatusCode)
  })

})