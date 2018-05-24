const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // yarn added this

const User = require('./User');

describe('User model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'));
  });
