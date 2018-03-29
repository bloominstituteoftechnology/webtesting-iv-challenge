const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const User = require('./models');

describe('Users',() => {
    describe('getUserName', () => {
        it('should return the expected user name', () => {
            const user = new User({
                name: 'User Foxtrot',
                age: 50
            });
            expect(band.getBandName()).to.equal('User Foxtrot');
        });
    });

    describe('getAllUsers', () => {
        it('should return all the bands', () => {
            sinon.stub(User, 'find');
            User.find.yields(null, [
                { name: 'User Foxtrot', age: 50 },
                { name: 'User Theta', age: 51 }
            ]);
            User.getAllUsers((users => {
                expect(users.length).to.equal(2);
                expect(users[1].name).to.equal('User Theta');
            }))
        })
    })
})

