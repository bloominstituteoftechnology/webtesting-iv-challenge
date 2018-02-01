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
            const myCountry = { // expected response 
                name: 'England',
                continent: 'Europe',
                capital: 'London'
            };
            console.log('making request')
            chai.request(server)
                .post('/api/countries')
                .send(myCountry) // send expected response to server
                .end((err, res) => { // get response back from server
                    console.log('resbody', res.body);
                    if (err) console.error(err);
                    done(); // handle error
                    expect(res.status).to.equal(200); // send success
                    expect(res.body.name).to.equal('England'); // compare expec
                    expect(res.body.continent).to.equal('Europe');
                    expect(res.body.capital).to.equal('London');
                    return done();
                });
        });
    });

    // describe(`[GET]/api/countries`, () => {
    //     it('should get all countries', () => {
    //         const england = {
    //             name: 'England',
    //             continent: 'Europe',
    //             capital: 'London'
    //         };
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

    // describe(`[PUT]/api/countries/:id`, () => {
    //     it('should update country based on id', () => {
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