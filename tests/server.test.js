const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
const Country = require('./models');
const server = require('./server');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);


describe('Country Server', () => {

    describe(`[POST]/api/country`, () => {
        it('should add a new country', () => {
            const myCountry = {
                name: 'England',
                continent: 'Europe'
            };
            chai.request(server)
                .post('/api/country')
                .send(myCountry)
                .end((err, res) => {
                    if (err) console.error(err)// handle error
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('England');
                });
        });
    });

    describe(`[GET]/api/countries`, () => {
        it('should get all countries', () => {
            const myCountry = {
                name: 'England',
                continent: 'Europe'
            };
            chai.request(server)
                .post('/api/country')
                .send(myCountry)
                .end((err, res) => {
                    if (err) console.error(err)// handle error
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('England');
                });
        });
    });

    describe(`[GET]/api/countries/:id`, () => {
        it('should get country based on id', () => {
            const myCountry = {
                name: 'England',
                continent: 'Europe'
            };
            chai.request(server)
                .post('/api/country')
                .send(myCountry)
                .end((err, res) => {
                    if (err) console.error(err)// handle error
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('England');
                });
        });
    });

    describe(`[PUT]/api/countries/:id`, () => {
        it('should update country based on id', () => {
            const myCountry = {
                name: 'England',
                continent: 'Europe'
            };
            chai.request(server)
                .post('/api/country')
                .send(myCountry)
                .end((err, res) => {
                    if (err) console.error(err)// handle error
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('England');
                });
        });
    });

    describe(`[DELETE]/api/countries/:id`, () => {
        it('should delete country based on id', () => {
            const myCountry = {
                name: 'England',
                continent: 'Europe'
            };
            chai.request(server)
                .post('/api/country')
                .send(myCountry)
                .end((err, res) => {
                    if (err) console.error(err)// handle error
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('England');
                });
        });
    });
});