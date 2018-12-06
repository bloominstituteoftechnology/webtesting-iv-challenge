const db = require('../data/dbConfig.js');
const hobbits = require('./hobbitsModel');

beforeEach(async () => {
  await db('hobbits').truncate();
});

describe('hobbits model', () => {
  it('should insert provided hobbit', async () => {
    // make sure the the test record is not in the db
    let rows = await db('hobbits').where({ name: 'sam' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await hobbits.insert({ name: 'sam' });
    await hobbits.insert({ name: 'frodo' });

    // make sure the test record is now in the db
    rows = await db('hobbits').where({ name: 'sam' });
    expect(rows).toHaveLength(1);

    rows = await db('hobbits');
    expect(rows).toHaveLength(2);
  });

  it('should update a record', () => {
    // insert a record
    // update the record by id = 1
    // check that the record was updated with the new information
  });
});
