const mongoose = require('mongoose');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const 'Magazine' =  require('./models');
chai.use(chaiHTTP);

describe('MagazineStand', () => {
  beforeEach(done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
    console.log('we are connected');
    done();
  });
});