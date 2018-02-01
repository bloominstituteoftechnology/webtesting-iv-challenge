const mongoose = require('mongoose');
const User = require('./models/user');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Users', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('#getUserFirstName', () => {
    it('should give back the proper user.fName', () => {
      const newUser = new User({
        fName: 'ting',
        lName: 'wang',
        email: '123@123.com'
      });
      expect(newUser.getFirstName()).to.equal('ting');
    });
  });

  describe('#getAllUsers()', () => {
    it('should return all the users', () => {
      sinon.stub(User, 'find');
      User.find.yields(null, [{ fName: 'ting', lName: 'wang', email: '123@123.com' }]);
      User.getAllUsers(returnObject => {
        expect(returnObject.length).to.equal(1);
        expect(returnObject[0].fName).to.equal('ting');
        User.find.restore();
      });
    });
  });
});