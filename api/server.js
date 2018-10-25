const express = require('express');

// --- Instantiate Server ---
const server = express();

// --- Use Middleware ---
server.use(express.json());

// --- Export Server ---
module.exports = server;

// Instantiate Resource
const trainers = [
    { 
    id: 0,
    name: "Ash",
    pokemon: "Pikachu" 
    }
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

// --- CREATE Trainers Endpoint
server.post('/api/addTrainer', (request, response) => {
    // Deconstruct the Request Body
    const { name, pokemon } = request.body;

    if (!name || !pokemon) {
        return response.status(400).json({errorMessage: "You must provide a name and a pokemon."})
    }
    const id = trainers[trainers.length - 1].id + 1;
    // Construct Trainer Object
    const trainer = { id, name, pokemon }

    // Add Trainer Object to the trainers array
    trainers.push(trainer);

    // Response with created trainer 
    response.status(201).json(trainer);
})

// --- DELETE Trainer Endpoint ---