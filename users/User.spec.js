const User = require('./User')
const mongoose = require('mongoose')

describe('user model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb')
    })

    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash passwords before storing to the DB, hashed pw should have a length of 60', async () => {
        const user = { username: 'bilbo', password: 'baggins' };

        const savedUser = await User.create(user)

        expect(savedUser.password).not.toEqual(user.password);
        expect(savedUser.password).toHaveLength(60);
    })
    it('should return the correct username stored in the db', async () => {
        const user = { username: 'bilbo', password: 'baggins' };
        const savedUser = await User.create(user)

        expect(savedUser.username).toEqual(user.username);
    })
    it('should return the deleted resource', async () => {
        const user = { username: 'bilbo', password: 'baggins' };

        const savedUser = await User.create(user)
        const response = await User.findByIdAndRemove(savedUser._id)

        expect(response._id).toEqual(savedUser._id)
    })
})
