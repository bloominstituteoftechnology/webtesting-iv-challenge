const mongoose = require('mongoose')

const Cat = require('./catModel');

describe('cat model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testdb');
    });
    afterEach(() => {
        return Cat.remove();
    })
    afterAll(() => {
        return mongoose.disconnect();
    })

    it('if the gender is male, add "Sir" to start - if female, add "Madam"', async () => {
        const human = ["5b1ecef46d552f7ef19595e3"]
        
        const cat = { name: 'Meowskers', gender: "female", humanSlave: human }
        
        const expected = { name: 'Madame Meowskers', gender: 'female', humanSlave: ["5b1ecef46d552f7ef19595e3"] }

        const savedCat = await Cat.create(cat)

        expect(savedCat.name).toEqual(expected.name)
        expect(savedCat).toHaveProperty('humanSlave')
    })
})