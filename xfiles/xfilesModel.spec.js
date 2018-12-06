const db = require('../data/dbConfig.js');

const xfiles = require('./xfilesModel');

beforeEach(async () => {
  await db('xfiles').truncate();
});

describe('xfiles model', () => {
  it('should insert the character', async () => {
    //check to see if the record exists
    let rows = await db('xfiles').where({ name: 'Dana Scully' });
    expect(rows).toHaveLength(0);
    //insert test record
    await xfiles.insert({ name: 'Dana Scully' });
    // make sure the test record is now in the db
    rows = await db('xfiles').where({ name: 'Dana Scully' });
    expect(rows).toHaveLength(1);
  });
  it('should get all records', async () => {
    //check that it is starting at 0
    let rows = await db('xfiles');
    expect(rows).toHaveLength(0);
    //insert new records
    await xfiles.insert({ name: 'Fox Mulder' });
    await xfiles.insert({ name: 'Walter Skinner' });
    await xfiles.insert({ name: 'Dana Scully' });
    //check for the number of records again
    rows = await db('xfiles');
    expect(rows).toHaveLength(3);
  })
})
