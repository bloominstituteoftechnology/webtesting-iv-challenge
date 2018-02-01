const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3333;

const server = express();
server.use(morgan('combined'));  // global middleware
server.use(bodyParser.json()); // global middleware



// create new country
server.post('/api/countries', (req, res) => {
    const countryInformation = req.body;
    if (!countryInformation.name) { // if no country name given, throw error
        re.status(400).json({ errorMessage: 'Please provide country name' });
    } else {
        const country = new Country(countryInformation);
        country
            .save()
            .then((newCountry) => {
                res.status(201).json(newCountry);
            })
            .catch((error) => {
                req.statusCode(500).json({
                    error: 'There was an error while saving the User to the Database'
                });
            });
    }
});


// get all
server.get('/api/countries', (req, res) => { // run for every request
    Country.find({})
        .then((users) => {
            res.status(200).json(country);
        })
        .catch(() => {
            res.status(500).json({ error: "The information could not be retrieved" });
        });
});


// get country based on id
server.get('/api/countries/:id', (req, res) => { // run for every request
    Country.find({})
        .then((users) => {
            res.status(200).json(country);
        })
        .catch(() => {
            res.status(500).json({ error: "The information could not be retrieved" });
        });
});


// update based on id
server.put('/api/countries/:id', (req, res) => {
    const { id } = req.params;
    Country.findByID(id)
        .then(function (country) {
            res.status(200).json(country);
        })
        .catch(function () {
            res.status(500).json({ error: "The information could not be retrieved" });
        });
});


// delete based on id
server.delete('/api/countries/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
        .then(function (country) {
            res.status(200).json({ message: "Country deleted" });
        })
        .catch(function () {
            res
                .status(500)
                .json({ error: "The information could not be retrieved or deleted" });
        });
});


server.listen(port, () => {
    console.log(`Using port ${port}`);
});

module.exports = server;

