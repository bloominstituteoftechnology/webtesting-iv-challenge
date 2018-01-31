const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');
const Routes = require('./')

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

describe('Something', () => {
    describe('inner Something', () => {

    });
});