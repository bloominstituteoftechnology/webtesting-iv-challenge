const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
    name: {
        required: true,
        type: String
    },
    continent: {
        required: true,
        type: String,
    },
    capital: {
        required: true,
        type: String,
    }
});



CountrySchema.methods.getCountryName = function () {
    return this.name;
};

CountrySchema.methods.getCountryContinent = function () {
    return this.continent;
};

CountrySchema.methods.getCountryCapital = function () {
    return this.capital;
};

CountrySchema.statics.getAllCountries = function (cb) {
    Country.find({}, (err, countries) => {
        if (err) return cb(err);
        cb(countries);
    });
};


const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;




// methods: functions that can live on every new instances of schema
// statics: function that lives in class themselves