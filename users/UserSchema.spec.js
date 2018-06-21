const mongoose = require('mongoose');
const User = require('./UserSchema');

describe('User Schema', () => {

    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb');
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('It should hash the password before saving the user to the database.', async () => {
        const bilbo = { username: 'bilbo', password: 'baggins' };

        const savedUser = await User.create(bilbo);

        expect(savedUser.username).toEqual(bilbo.username);
        expect(savedUser.password).not.toEqual(bilbo.password);
        expect(savedUser.password).toHaveLength(60);

        await User.deleteOne({ username: bilbo.username });
    });
}); 