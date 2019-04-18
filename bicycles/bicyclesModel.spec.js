const bicyclessDb = require('./bicyclesModel.js')
const db = require('../data/dbConfig.js');
describe('bicycles model', () =>{

    
    describe('insert()', () =>{
        afterEach(async () =>{
            await db('bicycles').truncate()
        })

        it('should insert the provided bicycle into the db', async()=>{
            await hobbitsDb.insert({name: 'Trek'})
            await hobbitsDb.insert({name: 'Specialized'})

            const hobbits = await db('bicycles')
            expect(hobbits).toHaveLength(2)
        })

        it('should insert the provided bicycle into the db', async() =>{
            let hobbit = await hobbitsDb.insert({name:'Specialized'})
            expect (hobbit.name).toBe('Specialized')

            bicycle = await bicycyclesDb.insert({name: 'fuckliati'})
            expect(bicycle.name).toBe('fuckliati')
        })
    })
})