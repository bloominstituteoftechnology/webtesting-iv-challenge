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
        it('should send back 422 upon bad data', (done) => {
            const testCountry = { // expected response 
                name: 'England',
                continent: 'Europe',
                capital: 'London'
            };
            chai
                .request(server)
                .post('/api/countries')
                .send(testCountry) // send expected response to server
                .end((err, res) => { // get response back from server
                    if (err) {
                        expect(re.status).to.equal(422);
                        const { error } = res.response.body;
                        expect(error).to.eql('There was an error while saving the User to the Database');
                        done(); // handle error
                    }
                });
        });
    });

    describe(`[GET]/api/countries`, () => {
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
    });
    it('should get all countries', done => {
        chai.request(server)
            .get('/api/countries')
            .end((err, res) => {
                if (err) {
                    throw new Error();
                    done()
                }
                done();
            })
    });
    //         const japan = {
    //             name: 'Japan',
    //             continent: 'Asia',
    //             capital: 'Tokyo'
    //         };
    //         chai.request(server)
    //             .post('/api/countries')
    //             .send()
    //             .end((err, res) => {
    //                 if (err) console.error(err)// handle error
    //                 expect(res.status).to.equal(200);
    //                 console.log('resbody', res.body);
    //                 expect(res.body.name).to.equal('none');
    //             });
    //     });
    // });

    // describe(`[GET]/api/countries/:id`, () => {
    //     it('should get country based on id', () => {
    //         const myCountry = {
    //             name: 'England',
    //             continent: 'Europe'
    //         };
    //         chai.request(server)
    //             .post('/api/country')
    //             .send(myCountry)
    //             .end((err, res) => {
    //                 if (err) console.error(err)// handle error
    //                 expect(res.status).to.equal(200);
    //                 expect(res.body.name).to.equal('England');
    //             });
    //     });
    // });

    describe(`[PUT]/api/countries/:id`, () => {
        it('should update country based on id', () => {
            const countryUpdate = {
                name: 'England',
                continent: 'Europe'
            };
            chai.request(server)
                .post('/api/country')
                .send(countryUpdate)
                .end((err, res) => {
                    if (err) {
                        throw new Error(err)
                        done();
                    }

                });
        });
    });

    // describe(`[DELETE]/api/countries/:id`, () => {
    //     it('should delete country based on id', () => {
    //         const myCountry = {
    //             name: 'England',
    //             continent: 'Europe'
    //         };
    //         chai.request(server)
    //             .post('/api/country')
    //             .send(myCountry)
    //             .end((err, res) => {
    //                 if (err) console.error(err)// handle error
    //                 expect(res.status).to.equal(200);
    //                 expect(res.body.name).to.equal('England');
    //             });
    //     });
    // });
});