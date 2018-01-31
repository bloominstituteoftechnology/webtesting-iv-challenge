const mongoose = require('mongoose');
const Climbs = require('./model.js');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Climbs', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'connection error:'));
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

    describe('#getAllClimbingLocations', () => {
        it('should return all climbing locations', () => {
            sinon.stub(Climbs, 'find');
            Climbs.find.yields(null, [{ climbingLocation: 'Vantage', zipCode: 98950, climbingType: 'sport' }]);
            Climbs.getAllClimbingLocations(allLocations => {
                expect(allLocations.length).to.equal(1);
                expect(allLocations[0].climbingLocation).to.equal('Vantage');
                Climbs.find.restore();
            });
        });
    });
});