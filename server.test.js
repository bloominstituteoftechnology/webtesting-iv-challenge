const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

describe('Server', () => {

    
    

    describe('[POST] /api/user', () => {
        it('should add a new user', (done) => {
            const newUser = {
                name: 'Donald Trump',
                gender: 'female',
                age: 99,
            };
            chai.request(server)
                .post('/api/user')
                .send(newUser)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('Donald Trump');
                });
            done();
        });
    });

    describe('GET /api/users', () => {
        it('should return all users', (done) => {

            chai.request(server)
                .get('/api/users')
                .end((err, users) => {
                    if(err) {
                        console.error(err);
                        done();
                    }
                    expect(users.status).to.equal(200);

                    // This data is coming form the users DB from Mongo.
                    expect(users.body).to.equal([ { _id: '5abd3a511350cc20ae734b82',
                        name: 'german',
                        gender: 'male',
                        age: 36,
                        __v: 0 },
                        { _id: '5abd3a7c1350cc20ae734b83',
                            name: 'Roy',
                            gender: 'male',
                            age: 28,
                            __v: 0 },
                        { _id: '5abd46ae586f2d38fcf66371',
                            name: 'Donald Trump',
                            gender: 'female',
                            age: 99,
                            __v: 0 },
                        { _id: '5abd4b3d99d37a274c27f365',
                            name: 'Donald Trump',
                            gender: 'female',
                            age: 99,
                            __v: 0 },
                        { _id: '5abd4b8435fd5e277a5f4368',
                            name: 'Donald Trump',
                            gender: 'female',
                            age: 99,
                            __v: 0 } ]);
                });
            done();
        })

    })

});

