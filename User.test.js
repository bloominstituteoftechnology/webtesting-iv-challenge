const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Users = require('./Users');

describe('Users', () => {
    describe('getUser', () => {
        it('should return the exact user', () => {
            const user = new Users({
                name: 'Anders Holm',
                location: 'Florida',
            });
            expect(user.getUser()).to.equal('Anders Holm');
        });
    });

describe('retrieveAllUsers', () => {
    it('should return all of the users', () => {
        sinon.stub(Users, 'find');
        Users.find.yields(null, [
            { name: 'Blake Anderson', location: 'Florida' },
            { name: 'Adam Devine', location: 'New York' }
        ]);
        Users.retrieveAllUsers((users) => {
            expect(users.length).to.equal(2);
            expect(users[1].name).to.equal('Adam Devine');
        });
    });
});
});
