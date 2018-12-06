//bring in dependencies
const express = require('express');;
const server = express();

//start up server
server.use(express.json());
const DuneRoute = require('../Dune/DuneRoute');
server.use('/chars', DuneRoute);


//testing to make sure server works
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Up and Running Captain' });
})

module.exports = server;