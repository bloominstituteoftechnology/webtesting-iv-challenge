const mongoose = require('mongoose');
const User = require('./User');


describe('user model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testsdb');
    });

    afterEach(() => {
        return User.remove();
    })

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the user', async () => {
        const medusa = { username: 'medusa', password: 'password' };

        const savedUser = await User.create(medusa);
    
        expect(savedUser.username).toEqual(medusa.username);
        expect(savedUser.password).not.toEqual(medusa.password);
        expect(savedUser.password).toHaveLength(60);
    });

    const userName = {
        string: true,
        number: false,
    };
    describe('username should be a string', () => {
        test('is a string named medusa', () => {
            expect(userName.string).toBeTruthy();
        });
    });


});