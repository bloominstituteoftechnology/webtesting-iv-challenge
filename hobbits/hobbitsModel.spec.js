const hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig.js');

beforeEach(async ()=> {
    await db('hobbits').truncate();
});

describe('hobbits model', ()=> {
    it('should insert provided hobbit', async ()=> {
        let rows = await db('hobbits').where({name: 'Sam'});
        expect(rows).toHaveLength(0);

        await hobbits.insert({ name: 'Sam' })
        await hobbits.insert({ name: 'Frodo' })
        await hobbits.remove({ name: 'Sam'})

        rows = await db('hobbits').where({ name: 'Sam' });
        expect(rows).toHaveLength(1);

        rows = await db('hobbits');
        expect(rows).toHaveLength(2);

    })

    it('should delete provided hobbit', async ()=> {
        let rows = await db('hobbits').where({name: 'Sam'});
        expect(rows).toHaveLength(0);

        
    })
})
