const mongoose = require('mongoose');
const User = require('./User');


describe('user model', () => {

    beforeAll(() => {
        mongoose.connect('mongodb://localhost/testdb');
    });
    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the user', async () => {
    const bilbo = { username: 'bilbo', password: 'baggins' };

    const savedUser = await User.create(bilbo);

    expect(savedUser.password).toEqual(bilbo.password);
 });
});