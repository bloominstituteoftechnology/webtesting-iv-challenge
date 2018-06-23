const mongoose = require('mongoose')
const User = require('./User') //doesn't exist yet

describe('User Model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb')
    })

    afterEach(() => {
        return User.remove()
    })

    afterAll(() => {
        return mongoose.disconnect()
    })

    it('should hash password before saving a user', async () => {
        const testUser = { username: 'cass', password: 'password' }
        const savedUser = await User.create(testUser)

        expect(savedUser.username).toBe('cass')
        expect(savedUser.password).not.toEqual('password')
        expect(savedUser.password).toHaveLength(60)
    })
})