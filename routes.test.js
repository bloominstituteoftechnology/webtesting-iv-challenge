const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
const Routes = require('./routes')

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const sinon = require('sinon');

describe('Routes', () => {
    describe('POST /climbs', () => {
        it('add a new item to the database (get request to check it)', () => {
            expect(1+1).to.equal(2);
        });
        it('returns a 200 code when an item is added to the db', () => {});
        it('returns a failure message/code when POST request fails with incorrect/insufficient data', () => {});

    });

    describe('PUT /climbs/:zipCode', () => {
        it('returns the same result when being called repeatedly/identically', () => {});
        it('returns new data after updating a resource(use get request to check it)', () => {});
        it('fails/cancels/does not update if invalid/insufficient data is provided', () => {});
    });

    describe('GET /climbs', () => {
        it('returns all resources', () => {});
        it('returns a specific resource when searching with a term/zipCode', () => {});
        it('should return a 200 status code if something is found', () => {});
        it('should return a failure message/code if nothing is found', () => {});
    });

    describe('DELETE /climbs/:zipCode', () => {
        it('returns a 200 code if successfully finds a resource with the zipCode given', () => {});
        it('correctly removes the resource from the db', () => {});
        it('returns a failure message/code if resource is not found', () => {});
    });
});