const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

/* Initialize Express */
const server = express();

/* Use Middlewares */
server.use(bodyParser);

/* Routes */
routes(server);

module.exports = server;
