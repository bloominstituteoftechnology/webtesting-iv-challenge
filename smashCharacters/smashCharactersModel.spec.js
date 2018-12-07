const db = require('../data/dbConfig.js');
const smashCharacters = require('./smashCharactersModel');

beforeEach(async () => {
  await db('smashCharacters').truncate();
});

describe('smash characters model', () => {
  it('should insert provided Smash Character', async () => {
    // make sure the the test record is not in the db
    let rows = await db('smashCharacters').where({ name: 'sam' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await smashCharacters.insert({ name: 'Mario' });
    await smashCharacters.insert({ name: 'Bowser' });

    // make sure the test record is now in the db
    rows = await db('smashCharacters').where({ name: 'Mario' });
    expect(rows).toHaveLength(1);

    rows = await db('smashCharacters');
    expect(rows).toHaveLength(2);
  });

  // it('should update a record', () => {
  // insert a record
  // update the record by id = 1
  // check that the record was updated with the new information
  // });
});
