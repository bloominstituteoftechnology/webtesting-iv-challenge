const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./User')

describe("User model", () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/test-server').then(console.log('test DB'))
    })

    beforeEach(() => {

    })

    afterEach(() => {

    })

    afterAll(() => {
        return User.remove()
    })
    it("Should hasj password before saving the user", async() => {
        const user = {username: "Don", password: "Don"};
        const savedUser = await User.create(user);
    })
})