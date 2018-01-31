const mongoose = require('mongoose');
const User = require('../models/UserModel')
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Users Model Tests Suite', () => {
    before((done) => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test_users')
    }) // Setting up our connection to the Database and or Model 
    after() // Closing our connection to the Database or Model 
});