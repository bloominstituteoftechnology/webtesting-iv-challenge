const mongoose = require('mongoose');
const User = require('./models/userModel');

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
            console.log('Coconuts at the Ready');
            done();
        });
    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('#getUserFirstName', function() {
        it('should return firstName', function() {
            const newUser = new User({
                firstName: 'Holy',
                lastName: 'Grail',
                email: 'Apples@bananas.com'
            });
            console.log(newUser);
            expect(newUser.getFirstName('Holy')).to.equal('Holy');
        });
    });

    describe('#getAllUsers()', () => {
        it('should return all the users', () => {
            sinon.stub(User, 'find');
            User.find.yields(null, [
                {
                    firstName: 'Holy',
                    lastName: 'Grail',
                    email: 'Apples@bananas.com'
                }
            ]);
            User.getAllUsers(returnObject => {
                expect(returnObject.length).to.equal(1);
                expect(returnObject[0].firstName).to.equal('Holy');
                User.find.restore();
            });
        });
    });
});
