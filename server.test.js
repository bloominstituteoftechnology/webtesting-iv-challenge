const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');

chai.use(chaihttp);

const Anime = require('./model');

describe('Server', () => {
  describe('[POST] /anime', () => {
  
  });
  describe('[GET] /anime', () => {
  
  });
  describe('[PUT] /anime', () => {
  
  });
  describe('[DELETE] /anime', () => {
  
  });
});