const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Dog = require('./Dog')

describe('POST /dogs', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/testingdb')
            .then(console.log('connected to test db'));
    });

    beforeEach(() => {
        // return Dog.remove();
    });

    afterEach(() => {
        return Dog.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the dog', async () => {
        const dog = { breed: 'frodo', password: 'irrelevant' };

        const savedDog = await Dog.create(dog);

        expect(savedDog.password).not.toEqual(dog.password);
        expect(savedDog.password).toHaveLength(60);
    });
});