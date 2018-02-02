const mongoose = require('mongoose');
const Climbs = require('./model');

const chai = require('chai');
const { expect, assert } = chai;
const sinon = require('sinon');

//describe is a suite, this is the container for the whole Climbs file
describe('Climbs', () => {
    // before --> this is done once, before our first test
    // before != beforeEach
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'connection error:')); // this is nuts
        db.once('open', () => {
            console.log('we are connected');
            done();
        });
    });
    // after --> this is done once, after our last test is completed
    // after != afterEach
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('#getClimbingType', () => {
        it('should return the correct type of climbing', () => {
           const climb = new Climbs({
               climbingLocation: 'Vantage',
               zipCode: 98950,
               climbingType: 'sport'
           });
           expect(climb.getClimbingType()).to.equal('sport');
        });
    });

    describe('#getAllClimbingEntries', () => {
        it('should return all climbing locations', () => {
            sinon.stub(Climbs, 'find');
            Climbs.find.yields(null, [{ climbingLocation: 'Vantage', zipCode: 98950, climbingType: 'sport' }]);
            Climbs.getAllClimbingEntries(allLocations => {
                expect(allLocations.length).to.equal(1);
                expect(allLocations[0].climbingLocation).to.equal('Vantage');
                Climbs.find.restore();
            });
        });
    });
});