const mongoose = require('mongoose');
const Country = require('../src/models');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');


describe('Country', () => {
    before(done => { // 
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('', () => console.error.bind(console, 'connection error')); // bind function to error
        db.once('open', () => {
            console.log('we are connected');
            done(); // go to next code block
        });
    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('#getCountryMethods', () => {
        it('should give back the proper country.name, country.continent, country.capital', () => {
            const country = new Country({ // make new instance for comparison
                name: 'USA',
                continent: 'North America',
                capital: 'Washington D.C.'
            });
            expect(country.getCountryName()).to.eql('USA'); // compare new instance with models funciton
            expect(country.getCountryContinent()).to.eql('North America');
            expect(country.getCountryCapital()).to.eql('Washington D.C.');
        });
    });

    describe('#getAllCountries()', () => {
        it('should return all the countries', () => {
            sinon.stub(Country, 'find'); // build method on band class called find on instance
            Country.find.yields(null, [{ name: 'USA', continent: 'North America' }]) // mock our find function, what our instances will return for us
            Country.getAllCountries((returnObject) => {
                expect(returnObject.length).to.equal(1);
                expect(returnObject[0].name).to.equal("USA");
                Country.find.restore(); // clean up stub
            })
        });
    });
});

// 'sudo mongod --dbPath' in terminal

