const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const User = require('./models');

describe('Server', () => {
    before((done) => {
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => {
            console.error('connection error');
        });
        db.once('open', () => {
            console.log('we are connected');
            done();
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe(`[POST] /user`, () => {
        it('should add a new user', (done) => {
            const newUser = {
                name: 'Check POint',
                age: '34',
            };
            chai.request(server)
                .post(`/user`)
                .send(newUser)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('Check POint');
                });
                done();
        });
    });

    describe('[GET] /users', () => {
        it('should return `Hello World`', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body).to.equal('Hello World');
                });
                done();
        });
        // it('returns all of the expected users', (done) => {})
        // describe('[GET] /band/:id', () => {
        //     it('should return 404 not found for an ID not found in the')
        // });
    });
});