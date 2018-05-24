// /users/User.spec.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // yarn added this

const User = require('./Users');

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

    expect(savedUser.password).not.toEqual(user.password);
    expect(savedUser.password).toHaveLength(60);
  });

    // it('Should delete a single User', async () => {
    //     const user = { username: 'Bilbo', password: 'irrelevant' };
    //     const savedUser = await User.create(user); // new + save
    //     expect(savedUser.password).not.toEqual(user.password);
    //     expect(savedUser.password).toHaveLength(60);
    
    // })
    it('.delete should work', async (done) => {
      // const user = { username: 'frodo', password: 'irrelevant' };

      // const savedUser = await User.create(user); 
      // user.findByIdAndRemove('/', function(req, res) {
      //   res.sendStatus(200);
      // });
  
      request(server)
        .delete('/')
        .expect(200, done);
    });

});