const app = require('../app');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);

describe('Users Server Routes Test', () => {
    // before()
    // after()
    describe(`[POST] /api/register`, () => {
        it('Should add a new user to the DB', (done) => {
            const user = {
                email: "test2@test2.com",
                password: "asdf",
                aboutme: "I do funny stuff to code"
            };
            chai.request(app)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(typeof res.body.id).to.equal('number');
                    return done();
                });
        });
    });
    describe(`[POST] /api/login`, () => {
        it('Should login a user and return it', (done) => {
            const user = {
                email: "test2@test2.com",
                password: "asdf"
            };
            chai.request(app)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(typeof res.body.aboutme).to.equal('string');
                    return done();
                });
        });
    });
});