const mongoose = require('mongoose');

const Food = require('./foodSchema.js');

describe('Food Schema here', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/testingdb')
      .then(console.log('connected to the mongo database'));
  });

  afterEach(() => {
    return Food.remove;
  });

  afterAll(() => {
    return mongoose.disconnect();
  });
  it('Should add new food item', async () => {
    const food = { name: 'Sandwich', price: 1000 };

    const savedFood = await Food.create(food);

    expect(saveFood.food).toEqual('Sandwich');
  })
})