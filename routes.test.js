const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const server = require('./server');

mongoose.connect('mongodb://localhost/test');
