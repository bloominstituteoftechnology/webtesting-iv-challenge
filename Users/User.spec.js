const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./User')

describe("User model", () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/test-server-model').then(console.log('test DB'))
    })

    beforeEach(() => {

    })

    afterEach(() => {

    })

    afterAll(() => {
        return User.remove()
    })
    it("Should hash password before saving the user", async() => {
        const user = {username: "Don", password: "Don"};
        const savedUser = await User.create(user);
        expect(savedUser.password).not.toEqual(user.password);
        expect(savedUser.password).toHaveLength(60)
    })
})