const mongoose = require('mongoose');
mongoose.connect('mongod://localhost/shows');

const server = require('./server');

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);