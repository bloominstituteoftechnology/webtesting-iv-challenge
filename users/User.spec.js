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

    it('Should hash the password before saving the user.', async () => {
        const bilbo = { username: 'bilbo', password: 'baggins' };

        const savedUser = await User.create(bilbo);
    
        expect(savedUser.password).not.toEqual(bilbo.password);
        expect(savedUser.password).toHaveLength(60);
    });
});