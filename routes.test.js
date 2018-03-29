const server = require('./server');
const User = require('./models/userModel');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
chai.use(chaiHTTP);

describe('The Holy Grail', () => {
    let userId;
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('Mongo connected');
            done();
        });
    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    beforeEach(done => {
        new User({
            firstName: 'Monty',
            lastName: 'Python',
            email: 'lovelybunchofcoconuts@bananas.com'
        }).save((err, savedUser) => {
            if (err) {
                console.log(err);
                return done();
            }
            userId = savedUser.id;
            done();
        });
    });

    afterEach(done => {
        User.remove()
            .then(() => done())
            .catch(error => done(error));
    });

    describe(`[POST] /api/users`, () => {
        it('should add a new user', done => {
            const newUser = {
                firstName: 'Holy',
                lastName: 'Grail',
                email: 'Apples@bananas.com'
            };
            chai
                .request(server)
                .post('/api/users')
                .send(newUser)
                .then(res => {
                    expect(res.status).to.equal(201);
                    expect(res.body.user.firstName).to.equal('Holy');
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe(`[GET] /api/users`, () => {
        it('should return all the users', done => {
            chai
                .request(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].firstName).to.equal('Monty');
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe(`[GET] /api/users/:id`, () => {
        it('should return user matching given id', done => {
            chai
                .request(server)
                .get(`/api/users/${userId}`)
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body.firstName).to.equal('Monty');
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe(`[PUT] /api/users/:id`, () => {
        it('should update the user with given id', done => {
            const update = {
                firstName: 'Knight',
                lastName: 'Nininini',
                email: 'Africanswallow@europeanswallow.com'
            };
            chai
                .request(server)
                .put(`/api/users/${userId}`)
                .send(update)
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body.firstName).to.equal('Knight');
                    expect(res.body.email).to.equal(
                        'Africanswallow@europeanswallow.com'
                    );
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe(`[DELETE] /api/users/:id`, () => {
        it('should delete the user with the given id', done => {
            chai
                .request(server)
                .delete(`/api/users/${userId}`)
                .then(res => {
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch(err => done(err));
        });
    });
});
