const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./User');

describe('new user in db', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/servertestDB')
            .then(console.log('connected to servertestDB'))
    });

    afterEach(() => {
        return User.remove();
    });

    it('should return both a username and a password', async () => {
        const user = { username: 'lambda', password: 'school' };
        const newUser = await User.create(user);
        expect(typeof newUser.username).toBe('string');
        expect(typeof newUser.password).toBe('string');
    });

    it('should hash the given password before it is saved to the user record', async () => {
        const user = { username: 'lambda', password: 'school' };
        const newUser = await User.create(user)
        expect(newUser.password).not.toEqual(user.password);
        expect(newUser.password).toHaveLength(60);
    });
})