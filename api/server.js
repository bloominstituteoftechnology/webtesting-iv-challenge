const express = require('express');

// --- Instantiate Server ---
const server = express();

// --- Use Middleware ---
server.use(express.json());

// --- Export Server ---
module.exports = server;

// ----- CRUD Endpoints -----

// --- Test Endpoint ---
server.get('/1234/test', (request, response) => {
    response.status(200).json("DO NOT TEST ME BRO!")
})