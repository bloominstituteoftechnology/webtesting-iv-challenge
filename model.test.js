const mongoose = require('mongoose');
const Food = require('./food');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon'); // <~~~~~~~~~~~~~~~ STUBBING

// mongoose.connect('mongodb://localhost/test'); // ~~~> , { useMongoClient: true }, (err) => {...} ???
/* eslint no-console: 0 */
mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, (err) => {
  if (err) return console.log(err);
  console.log('DUDE! You are like totally connected to the MODELS TEST DataBase, man!');
});
// added to use npm run watch, not sure if this is the best practice?
// Wish I had better documentatin than this: https://groups.google.com/forum/?fromgroups=#!topic/mongoose-orm/PXTjqqpaDFk
mongoose.models = {};
mongoose.modelSchemas = {};
// Promises & mongoose: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const expect = chai.expect;
chai.use(chaiHTTP);

describe('Food', () => {
  describe('#getName()', () => {
    const food = new Food({ // <~~~~~~~ Is this okay or is it better to make declarations within the it('should... ?
      name: 'Rib Steak'
    });
    it('should be a function', () => {
      expect(food.getName).to.be.a('function');
    });
    it('should return a String', () => {
      expect(typeof food.getName()).to.equal('string');
    });
    it('should return the name of the food', () => {
      expect(food.getName()).to.equal('Rib Steak');
    });
  });
});
