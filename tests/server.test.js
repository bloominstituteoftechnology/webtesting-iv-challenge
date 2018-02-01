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

    describe(`[PUT] /api/update/:id`, () => {
        it('Should returns the updated user object', (done) => {
            const user = {
                aboutme: "I do great stuff to code"
            };
            chai.request(app)
                .put('/api/update/1')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(typeof res.body.id).to.equal('number');
                    expect(res.body.aboutme).to.equal(user.aboutme);
                    expect(typeof res.body.email).to.equal('string');
                    expect(typeof res.body.password).to.equal('string');
                    return done();
                });
        });
    });

    describe(`[DELETE] /api/delete/:id`, () => {
        it('Should sucessfully delete the user', (done) => {
            const msg = { msg: 'user has been deleted!' };
            const user = {
                email: "test2@test2.com",
                password: "asdf"
            };
            chai.request(app)
                .delete('/api/delete/1')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(typeof res.body.msg).to.equal('string');
                    return done();
                });
        });
    });

    describe(`[GET] /users`, () => {
        it('Should retrieve a list of users', (done) => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(typeof res.body).to.equal('object');
                    expect(res.body).to.have.length.above(0);
                    return done();
                });
        });
    });
});