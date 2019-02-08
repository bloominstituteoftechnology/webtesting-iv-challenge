const musicians = require('./musiciansModel');
const db = require('../data/dbConfig');

describe('the musicians model', () => {

  afterEach(async () => {
    await db('musicians').truncate();
  })

  it('should insert new musicians', async() => {
    const ids = await musicians.insert({ name: 'Marky'});

    expect(ids.length).toBe(1);
    expect(ids[0]).toBe(1);
    
  })
})