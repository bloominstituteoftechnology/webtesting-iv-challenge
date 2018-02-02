const mongoose = require('mongoose');
const server = require('./server');
const Routes = require('./routes')
const Climbs = require('./model');

const chai = require('chai');
const { expect, assert} = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const sinon = require('sinon');

//before and after are done once, beforeEach and afterEach are done for each test

describe('Routes', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => { console.error.bind(console, 'connection error: ')});
        db.once('open', () => {
            console.log('connected');
            done();
        });
    });
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    beforeEach(done => {
        let testClimb = null;
        let climbId = null;
        const newClimb = new Climbs({
            climbingLocation: 'test location',
            zipCode: 12345,
            climbingType: 'mixed'
        });
        newClimb
            .save()
            .then(climb => {
                testClimb = climb;
                climbId = climb._id;
                done();
            })
            .catch(error => {
                console.log(error);
                done();
            });
    });

    afterEach(done => {
        Climbs.remove({}, error => {
            if (error) console.error(error);
            done();
        });
    });

    describe('POST /climbs', () => {
        it('add a new item to the database (get request to check it)', () => {
            const climb = {
                climbingLocation: 'test1',
                zipCode: 54321,
                climbingType: 'blah'
            };
            chai
                .request(server)
                .post('/climbs')
                .send(climb)
                .end((error, result) => {
                    if (error) {
                        expect(error.status).to.equal(422);
                        const { error } = error.response.body;
                        done();
                    }
                });
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