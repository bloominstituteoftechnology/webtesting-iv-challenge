const mongoose = require('mongoose');
const User = require('../models/UserModel')
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

// describe('Users Model Tests Suite', () => {
//     before((done) => {
//         mongoose.Promise = global.Promise;
//         mongoose.connect('mongodb://localhost/users');
//         const db = mongoose.connection;
//         db.on('error', () => {
//             console.error.bind(console, 'connection error');
//         });
//         db.once('open', () => {
//             console.log('database connection successful');
//             done();
//         });
//     }); // Setting up our connection to the Database and or Model 
//     after((done) => {
//         const db = mongoose.connection;
//         db.dropDatabase(() => {
//             db.close(done);
//         });
//     }); // Closing our connection to the Database or Model 
//     describe('Users Model DB Connection Test', () => {
//         it('Should return Database connection Successful', () => {

//         });
//     });
// });