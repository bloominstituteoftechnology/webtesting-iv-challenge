const mongoose = require('mongoose');

const User = require('./User');

describe('user model', () => {
 beforeAll(() => {
   return mongoose.connect('mongodb://localhost/testdb');
 });

 afterEach(() => {
   return User.remove();
 });

 afterAll(() => {
   return mongoose.disconnect();
 });

 it('should hash the password before saving the user', async () => {
   const bilbo = { username: 'bilbo', password: 'baggins' };

   const savedUser = await User.create(bilbo);

   expect(savedUser.username).toEqual(bilbo.username);
   expect(savedUser.password).not.toEqual(bilbo.password);
   expect(savedUser.password).toHaveLength(60);
 });
});
describe('post a user', () => {
    it('Checks if user was posted successfully', async (done) => {
        const userSchema = {username: 'Sagar', password: 'lambda', country: 'USA'}
        const newUser = await User.create(userSchema);
        console.log(newUser.username);
        expect(newUser.username).toEqual('Sagar');
        done();
    });
    it('Checks if the password is hashed properly', async (done) => {
        const userSchema = {username: 'Sagar', password: 'lambda', country: 'USA'}
        const newUser = await User.create(userSchema);
        expect(newUser.password).not.toEqual(userSchema.password);
        done();
    });
})