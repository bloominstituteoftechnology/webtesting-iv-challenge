const mongoose = require('mongoose')

const User = require('./userModel');

describe('user model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb');
    });
    afterEach(() => {
        return User.remove();
    })
    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the user', async () => {
        const user = { username: 'Username', password: 'password' };

        const savedUser = await User.create(user);

        expect(savedUser.username).toEqual(user.username);
        expect(savedUser.password).not.toEqual(user.password);
        expect(savedUser.password).toHaveLength(60);
    });
});