const express = require('express');
const mongoose = require('mongoose');
const localHost = 'localhost:27017';
const database = 'blizzdb';
const Toon = require('./ToonModel');
const server = express();
const port = process.env.PORT || 5005;

mongoose
    .connect(`mongodb://${localHost}/${database}`)
    .then(response => {
        console.log("Connection Successful")
    })
    .catch(error => {
        console.log("Connection Failed")
    });

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});
    
server.post('/toons', (req, res) => {
    const newToon = req.body
    
    Toon    
        .create(newToon)
        .then(response => {
            res.status(201).json({ newToon: response })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: error.message })
        })
})

if(process.env.NODE_ENV !== 'test') {     
    server.listen(port, () => {
        console.log(`\n=== API up on port: ${port} ===\n`)
      });
}
    
module.exports = server;
