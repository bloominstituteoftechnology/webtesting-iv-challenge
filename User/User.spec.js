const mongoose = require('mongoose');
const User = require('./User');

describe.skip('user model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/servertestdb');
    });

    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the user', async () => {
        const user = { username: 'steve', password: 'password' };

        const newUser = await User.create(user);

        expect(newUser.username).toEqual(user.username);
        expect(newUser.password).not.toEqual(user.password);
        expect(newUser.password).toHaveLength(60);
    })
})