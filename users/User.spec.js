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

    it('Should hash the password before saving the user to the database.', async () => {
        const user = { username: 'Paul Graham', password: 'ycombinator' };

        const newUser = await User.create(user);

        expect(newUser.password).not.toEqual(user.password);
        expect(newUser.password).toHaveLength(60);
    });

    it('Should return the correct username saved in the database', async () => {
        const user = { username: 'Brian Chesky', password: 'ycombinator' };
        const newUser = await User.create(user);

        expect(newUser.username).toEqual(user.username);
    });

    it('Should return the deleted user.', async () => {
        const user = {username: 'Patrick Collison', password: 'ycombinator' };

        const newUser = await User.create(user)
        const response = await User.findByIdAndRemove(newUser._id)

        expect(response._id).toEqual(newUser._id)
    });
});