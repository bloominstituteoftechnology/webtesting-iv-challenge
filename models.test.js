const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHTTP);
const mongoose = require('mongoose');

const Person = require('./person');

describe('Models', () => {
  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('Person model', () => {

    it('Should create a person', (done) => {
      const person = new Person({
        firstName: 'Jesse',
        lastName: 'Hood'
      });
      person.save((err, result) => {
        if (err) return done(err);
        expect(result.firstName).to.equal('Jesse');
        expect(result.lastName).to.equal('Hood');
        done();
      });
    });
    it('Should find people', (done) => {
      Person.find().then((people) => {
        expect(people.length).to.equal(1);
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('Should get the full name of a person', (done) => {
      Person.findOne().then((person) => {
        expect(person.getFullName()).to.equal('Jesse Hood');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('Should find a person by their first name', (done) => {
      Person.findByFirstName('Jesse').then((person) => {
        expect(person.firstName).to.equal('Jesse');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('Should update a person', (done) => {
      Person.find
      Person.findOne().then((person) => {
        person.firstName = 'Jon';
        return person.save();
      }).then((savedPerson) => {
        expect(savedPerson.firstName).to.equal('Jon');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('Should delete a person', (done) => {
      Person.findOne().then((person) => {
        return person.remove();
      }).then(() => {
        return Person.count();
      }).then((count) => {
        expect(count).to.equal(0);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});