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
  });
  it('should delete the specified record', async () => {
    //check that there is nothing in the database
    let rows = await db('xfiles');
    expect(rows).toHaveLength(0);
    // insert records
    await xfiles.insert({ name: 'Fox Mulder' });
    await xfiles.insert({ name: 'Walter Skinner' });
    await xfiles.insert({ name: 'Dana Scully' });
    //check that the record was inserted
    rows = await db('xfiles').where({ name: 'Dana Scully' });
    expect(rows).toHaveLength(1);
    //remove the record
    await xfiles.remove(3);
    //check that the record was removed
    rows = await db('xfiles').where({ name: 'Dana Scully' });
    expect(rows).toHaveLength(0);
    //check that the other records remain
    rows = await db('xfiles');
    expect(rows).toHaveLength(2);
  })
})
