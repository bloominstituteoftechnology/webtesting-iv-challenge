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

    it('should hash the password before saving the user', async () => {
        const galadriel = {
            username: 'galadriel',
            password: 'silmaril'
        };

        const savedUser = await User.create(bilbo);

        expect(savedUser.username).toEqual(galadriel.username);
        expect(savedUser.password).toEqual(galadriel.password);
        expect(savedUser.password).toHaveLength(60);
    });
}); 
