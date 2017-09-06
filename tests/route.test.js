const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Animal = require('../animalmodel');
const server = require('../server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHttp);

describe('/animal', () => {
  beforeEach((done) => {
    Animal.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[Get] /list-animal' , () => {

  })
  describe
})
