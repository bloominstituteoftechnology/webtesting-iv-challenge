const mongoose = require('mongoose');
const User = require('./User');

describe('User model', () => {

    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb')
    })

    afterEach(() => {
        return User.remove();
    })

    afterAll(() => {
        return mongoose.disconnect();
    })

    it('should hash users password before saving', async() => {
        const user = { username: 'gollum', password: 'precious' };

        const savedUser = await User.create(user);

        expect(savedUser.username).toEqual(user.username);
        expect(savedUser.password).not.toEqual(user.password);
        expect(savedUser.password).toHaveLength(60);
    })
})
