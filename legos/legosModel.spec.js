const db = require('../data/dbConfig.js');
const legos = require('./legosModel.js');

beforeEach(async () => {
  await db('lego-themes').truncate();
})

describe('lego themes model', () => {
  it('should insert provided lego theme', async () => {

    // Make sure test record is NOT in the db
    let rows = await db('lego-themes').where({ parent_id: 1, name: 'Juniors' })
    expect(rows).toHaveLength(0);
    // Insert a test record
    await legos.insert({ parent_id: 1, name: 'Juniors' })
    await legos.insert({ parent_id: 2, name: 'Star Wars' })

    rows = await db('lego-themes').where({ parent_id: 1, name: 'Juniors' })
    expect(rows).toHaveLength(1);
    rows = await db('lego-themes');
    expect(rows).toHaveLength(2);
  })

  // it('should update a record', () => {
  //   // insert a record
  //   // update the record by id = 1
  //   // check that the record was updated with the new information
  // })
})