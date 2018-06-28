const mongoose = require('mongoose');
const User = require('./User');  //need to create next

describe('userModel', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testuserdb');
    })

    afterEach(() => {
        return User.remove();
    })

    afterAll(() => {
        return mongoose.disconnect();
    })

    describe('create user', () => {
        it('should create users and password successfully', async () => {
            const testUser = { username: 'harry', password: 'potter' };
            const saveUser = await User.create(testUser);
            expect(saveUser.username).toEqual(testUser.username);
            expect(saveUser.password).toEqual(testUser.password);
        });
    })
})