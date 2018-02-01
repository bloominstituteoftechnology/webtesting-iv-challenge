const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const User = require('../src/models.js');

const { expect, assert } = chai;

chai.use(chaiHTTP);

describe('Models', () => {

  before(done => {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/users');

    const db = mongoose.connection;

    db.on('error', () => {
      done(new Error('Connection Error'));
    });

    db.once('open', () => {
      console.log('Connection Successfull');
      done();
    });

  });

  after(done => {

    const db = mongoose.connection.db;

    db.dropDatabase(() => {
      mongoose.connection.close(done);
    });

  });

  describe('getUserName() and getUserEmail()', ()=>{

    const user = new User({
      name:'John Doe', 
      email: 'john@doe.com',
    });
    
    it('should return collect value for getUserName()', ()=>{
      expect(user.getUserName()).to.equal('John Doe');
    });

    it('should return collect value for getUserEmail()', ()=>{
      expect(user.getUserEmail()).to.equal('john@doe.com');
    });
    
  });

  describe('getAllUsers()', () => {

    it('should return a list of all the users', () => {

      sinon.stub(User, 'find');

      User.find.yields(null, [{
        name:'John Doe', 
        email: 'john@doe.com',
      }]);

      User.getAllUsers(users => {
        
        expect(users.length).to.equal(1);
        expect(users[0].name).to.equal('John Doe');
        expect(users[0].email).to.equal('john@doe.com');

        User.find.restore();

      });

    });

  });

});