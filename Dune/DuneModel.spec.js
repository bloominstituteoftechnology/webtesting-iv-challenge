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
    it('should delete the specified record', async () => {
        //check that there is nothing in the database
        let rows = await db('Dune');
        expect(rows).toHaveLength(0);
        // insert records
        await Dune.insert({ name: 'Leto Atreides' });
        await Dune.insert({ name: 'Lady Jessica' });
        await Dune.insert({ name: 'Paul Atreides' });
        //check that the record was inserted
        rows = await db('Dune').where({ name: 'Paul Atreides' });
        expect(rows).toHaveLength(1);
        //remove the record
        await Dune.remove(3);
        //check that the record was removed
        rows = await db('Dune').where({ name: 'Paul Atreides' });
        expect(rows).toHaveLength(0);
        //check that the other records remain
        rows = await db('Dune');
        expect(rows).toHaveLength(2);
    })
})