const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
const Country = require('./models');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');


describe('Country', () => {

    describe('#getCountryName', () => {
        it('should give back the proper country.name', () => {
            const country = new Country({ // make new instance for comparison
                name: 'USA',
                continent: "North America"
            });
            expect(country.getCountryName()).to.eql('USA'); // compare new instance with 
        });
    });

    describe('#getAllCountries()', () => {
        it('should return all the countries', () => {
            sinon.stub(Country, 'find'); // build method on band class called find on instance
            Country.find.yeilds(null, [{ countryName: 'USA', continent: 'North America' }]) // mock our find function, what our instances will return for us
            Country.getAllCountries((Country) => {
                expect(Country.length).to.equal(2);
                expect(Country[0].name).to.equal("USA");
                Country.find.restore(); // clean up stub
            })
        });
    });
});

