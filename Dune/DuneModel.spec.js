const db = require('../data/dbConfig.js');
const Dune = require('./DuneModel');

beforeEach(async () => {
    await db('Dune').truncate();
});
describe('Dune model', () => {

    it('should insert the character', async () => {
        //check to see if the record exists
        let rows = await db('Dune').where({ name: 'Paul Atreides' });
        expect(rows).toHaveLength(0);
        //insert test record
        await Dune.insert({ name: 'Paul Atreides' });
        // make sure the test record is now in the db
        rows = await db('Dune').where({ name: 'Paul Atreides' });
        expect(rows).toHaveLength(1);
    });

    it('should get all records', async () => {
        //check that it is starting at 0
        let rows = await db('Dune');
        expect(rows).toHaveLength(0);
        //insert new records
        await Dune.insert({ name: 'Leto Atreides' });
        await Dune.insert({ name: 'Lady Jessica' });
        await Dune.insert({ name: 'Paul Atreides' });
        //check for the number of records again
        rows = await db('Dune');
        expect(rows).toHaveLength(3);
    })
})