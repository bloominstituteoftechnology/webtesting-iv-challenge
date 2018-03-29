
const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Jobs = require('./models');

describe('Jobs', () => {
    describe('getJobName', () => {
        it('should return the expected name of job', () => {
            const job = new Jobs({
                name: 'Joyce Corley',
                occupation: 'Nurse',
            });
            expect(job.getJobsName()).to.equal('Joyce Corley');
        });
    });

    describe('getAllJobs', () => {
        it('should return all the jobs', () => {
            sinon.stub(Jobs, 'find');
            Jobs.find.yields(null, [
                { name: 'Joyce Corley', occupation: 'Nurse' },
                { name: 'John Smith', occupation: 'Author' }
            ]);
            Jobs.getAllJobs((jobs) => {
                expect(jobs.length).to.equal(2);
                expect(jobs[1].name).to.equal('John Smith');
            });
        });
    });
});