const db = require('../data/dbConfig.js');
const wotChar = require('./wotCharModel');

beforeEach(async () => {
  await db('characters').truncate();
});

describe('characters model', () => {
  it('should insert provided character', async () => {
    // make sure the test record is not in the db
    let rows = await db('characters').where({ name: 'Rand' });
    expect(rows).toHaveLength(0);

    //insert a test record
    await wotChar.insert({ name: 'Rand' });
    await wotChar.insert({ name: 'Perrin' });

    //make sure the test record is now in the db
    rows = await db('characters').where({ name: 'Rand' });
    expect(rows).toHaveLength(1);

    rows = await db('characters');
    expect(rows).toHaveLength(2);
  });
});
