const mongoose = require('mongoose');
const Toon = require('./ToonModel');

describe('Toon Model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost:27017/blizzdb')
    })
    afterEach(() => {
        return Toon.remove();
    })
    afterAll(() => {
        return mongoose.disconnect();
    })

    it('should hash the password before saving the toon to the DB', async() => {
        const thrall = { name: 'Thrall', franchise: 'Warcraft', password:'4thehorde' };
        const newToon = await Toon.create(thrall);

        expect(newToon.name).toEqual(thrall.name);
        expect(newToon.franchise).toEqual(thrall.franchise)
        expect(newToon.password).toHaveLength(60)
    })
})