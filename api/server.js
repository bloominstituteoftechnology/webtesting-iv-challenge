const express = require('express');

// --- Instantiate Server ---
const server = express();

// --- Use Middleware ---
server.use(express.json());

// --- Export Server ---
module.exports = server;

// Instantiate Resource
const trainers = [
    { name: "Ash",
pokemon: "Pikachu" }
];

// ----- CRUD Endpoints -----

// --- Test Endpoint ---
server.get('/1234/test', (request, response) => {
    response.status(200).json("DO NOT TEST ME BRO!")
})

// --- GET Trainers Endpoint ---
server.get('/api/trainers', (request, response) => {
    response.status(200).json(trainers);
})