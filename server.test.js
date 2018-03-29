const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const user = require('./models');

describe('Server', () => {
    
    
    
    
    
    describe('[POST] /user', () => {
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
});

