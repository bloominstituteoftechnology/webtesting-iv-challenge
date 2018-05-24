const mongoose = require('mongoose');
const Fries = require('./FriesModel');

const server = require('./server');

describe('Fries', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'))
      .catch(err => console.log(err)); 

  });

  it('should super size', async () => {
    let fries;

    try {
      fries = await Fries.create({
        size: 'medium',
        salt: true,
        ketchup: true
      })
    } 
    catch(err) {
      console.log(err);
    }

    fries.superSizeMe();

    expect(fries.size).toBe('super');
  });
});
