const mongoose = require('mongoose');

const User = require('./User');

describe('user model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/server-testing-db');
    });

    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('Should hash the password before saving the user.', async () => {
        const user = { username: 'paulgraham', password: 'ycombinator' };

        const newUser = await User.create(user);

        expect(newUser.username).toEqual(user.username);
        expect(newUser.password).not.toEqual(user.password);
        expect(newUser.password).toHaveLength(60);
    });
});