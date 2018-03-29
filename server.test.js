const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Job = require('./models');

describe('Server', () => {

    before((done) => {
        mongoose.connect('mongodb://localhost/jobs');
        const db = mongoose.connection;
        db.on('error', () => {
            console.error('connection error');
        });
        db.once('open', () => {
            console.log('We are connected')
            done();
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('[POST] /jobs', () => {
        it('should add a new job', (done) => {
            const job = {
                name: 'John Smith',
                occupation: 'Author'
            };
            chai.request(server)
                .post('/jobs')
                .send(job)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('John Smith');
                });
            done();
        });
    });

    describe('[GET] /jobs', () => {
        it('should return all the jobs', (done) => {
            chai.request(server)
                .get('/jobs')
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('array');
                });
            done();
        });
    });

    describe('[PUT] /jobs/:id', () => {
        it('should update a single job on /jobs/<id>', (done) => {
            const first = new Job({
                name: 'Matthew Smith',
                occupation: 'Author'
            });

            const second = {
                name: 'Matthew Smith',
                occupation: 'Software Engineering'
            }

            chai.request(server)
                .get('/jobs')
                .end((err, res) => {
                    chai.request(server)
                        .put('/jobs/' + res.body[0]._id)
                        .send(first)
                        .end((err, res) => {
                            if (err) console.log(err);
                            expect(res.status).to.equal(200);
                            expect(res.body.occupation).to.equal('Software Engineer');
                        });
                    done();
                });
        });
    });

});