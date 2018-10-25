const express = require('express');
const server = express();

server.use(express.json());

// server.get('/', (req, res) => {
//     res.status(200).json({message: 'server is working'});
// });


function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

const states = {
    'California': {
        cities: ['Los Angeles', 'San Fransisco', 'Sacramento']
    },
    'Texas': {
        cities: ['Houston', 'Austin', 'Dallas']
    },
    'New York': {
        cities: ['New York', 'Albany', 'Buffalo']
    }
}

server.get('/api/cities', (req, res) => {
    res.status(200).json(states);
})

server.post('/api/cities/:cityName', (req, res) => {
    const {cityName} = req.params;
    const {stateName} = req.body;
    res.status(200).json({message: `${cityName}, ${stateName}`});
})

module.exports = server;