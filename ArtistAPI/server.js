const express = require('express');
const bodyparser = require('body-parser');

const cors = require('cors');


const server = express();
server.use(bodyparser.json());
const corsOptions = {
  "origin" : "http://localhost:3000",
  "credentials" : true
}
server.use(cors(corsOptions));

require('./controllers')(server);

module.exports = server;
