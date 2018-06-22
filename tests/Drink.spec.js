const mongoose = require('mongoose');
// Test Subject
const Drink = require('../models/Drink');

describe.skip('Drink Model:', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testdb');
  });

  afterEach(() => {
    Drink.remove({});
  });

  afterAll((() => {
    return mongoose.disconnect();
  }));

  it('creates a drink', async () => {
    const thaiTea = {
      name: 'Thai Tea',
      type: 'tea',
      description: 'Rich and delicious. Wonderful with ice.'
    }

    const savedDrink = await Drink.create(thaiTea);
    expect(savedDrink).toEqual(expect.objectContaining(thaiTea));
    expect(savedDrink).toHaveProperty('alcoholic',false);
  });
});