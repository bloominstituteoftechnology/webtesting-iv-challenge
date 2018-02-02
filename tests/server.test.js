const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
const Country = require('../src/models');
const server = require('../src/server');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);


describe('Country Server', () => {

    let countryId = null;
    beforeEach(() => { // populate database with data
        const testCountry = new Country({ // test object
            name: 'Spain',
            continent: 'Europe',
            capital: 'Madrid'
        });
        testCountry // save to database
            .save()
            .then(country => {
                testCountry = country;
                countryId = country._id;
                done();
            })
            .catch(err => {
                console.error(err);
                done();
            });
    });
    afterEach(() => { // clean out test database
        Country.remove({}, (err));
        if (err) console.error(err);
        done();
    });

    describe(`[POST]/api/countries`, () => {
        it('should add a new country', (done) => {
            const testCountry = { // expected response 
                name: 'England',
                continent: 'Europe',
                capital: 'London'
            };
            console.log('making request')
            chai
                .request(server)
                .post('/api/countries')
                .send(testCountry) // send expected response to server
                .end((err, res) => { // get response back from server
                    expect(res.status).to.equal(200); // send success
                    expect(res.body.name).to.equal('England'); // compare expec
                    expect(res.body.continent).to.equal('Europe');
                    expect(res.body.capital).to.equal('London');
                    return done();
                });
        });
    });

    describe(`[GET]/api/countries`, () => {

        it('should get all countries', done => {
            chai.request(server)
                .get('/api/countries')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(1);
                    done();
                })
        });
    });

    describe(`[GET]/api/countries/:id`, () => {
        it('should get country based on id', () => {
            const newCountry = {
                id: countryId,
                name: 'England',
                continent: 'Europe',
                capital: 'London'
            };
            newCountry.save(function (err, data) {
                chai.request(server)
                    .get('/blob/' + data.id)
                    .end(function (err, res) {
                        expect(res.status).to.equal(200);
                        expect(res.status).to.equal(200);
                        expect(res.body.name).to.equal('England');
                        expect(res.body.continent).to.equal('Europe');
                        expect(res.body.capital).to.equal('London');
                        done();
                    });
            });
        });
    });


    describe(`[PUT]/api/countries/:id`, () => {
        it('should update country based on id', () => {
            const countryUpdate = {
                id: countryId,
                name: 'England',
            };
            chai.request(server)
                .post('/api/country')
                .send(countryUpdate)
                .end((err, res) => {
                    if (err) {
                        throw new Error(err)
                        expect(res.body.name).to.equal('England');
                        expect(res.body.name).to.equal('England');
                        done();
                    }

                });
        });
    });

    describe(`[DELETE]/api/countries/:id`, () => {
        it('should delete country based on id', (done) => {
            chai.request(server)
                .delete(`/api/countries/${countryId}`)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        return done();
                    }
                    expect(res.text).to.equal('success');
                    Country.findById(countryId, (err, deletedCountry) => {
                        if (err) {
                            console.log(err);
                            return done();
                        }
                        expect(deletedCountry).to.equal(null);
                        done();
                    });
                });
        });
    });
});
