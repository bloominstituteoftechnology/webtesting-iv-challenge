const mongoose = require('mongoose');
const User = require('./User');

describe('user model', () => {
    beforeAll(function() {
        return mongoose.connect('mongodb://localhost/userdb');
    })

    it('should create a new user', async () => {
        const user = {username: 'test', password: 'test'};
        let createdUser = await User.create(user)
        
        expect(createdUser.username).toEqual(user.username);
    })

    it('should create a hashed password', async () => {
        const user = { username: 'test', password: 'test'};
        let createdUser = await User.create(user);

        expect(createdUser.password).not.toEqual(user.password);
    })
})
