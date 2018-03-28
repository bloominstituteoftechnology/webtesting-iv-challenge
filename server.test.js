const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobs');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Job = require('./models');

describe('Server', () => {
    describe('[POST] /jobs', () => {
        it('should add a new job', () => {
            const job = {
                name: 'John Smith',
                occupation: 'Author'
            };
            chai.request(server)
            .post('/jobs')
            .send(job)
            .end((err, res) => {
                console.log(res.body);
                if (err) console.error(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('John Smith');
            });
        });
    });

    describe('[GET] /jobs', () => { 
        it('should return all the jobs', () => {
            chai.request(server)
            .get('/jobs')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('array');
            });
        });
    });
});