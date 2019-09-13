const Drinks= require('./drinksModel')
const server= require('./server.js')
const db= require('../data/dbConfig.js')

describe('Drinks Model', () => {
    beforeEach(async () => {
        await db('drinks').truncate();
    })

    describe('insert function', () => {
        it('should insert a new drink', () => {

            const drinkData = { espresso: 'decaf' };
            const drink = await Drinks.insert(drinkData)

            const drinks = await db('drinks')
            expect(drinks.length).toBe(4);
            expect(drinks[0].espresso).toBe('decaf');
        })

        it('should resolve to newly created drink', async () => {
            const drinkData= { espresso: 'decaf'};
            const drink= await Drinks.insert(drinkData);

            expect(drink).toEqual({ id: 1, espreso: 'decaf'})
        })
    })

    describe('the remove function', (req, res) => {
        const { id } = req.params;
        const drink= await Drinks.remove(id)

        const drinks= await db('drinks')
        expect 
    })

})