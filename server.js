const mongoose = require('mongoose');
const express = require('express');
const server = express();

mongoose
.connect('mongodb://localhost/ServerTestingDB')
.then(mongo => console.log('\n Connected to ServerTestingDB \n'))
.catch(err => console.log('Error connecting to ServerTestingDB'))

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is working' })
})

// server.post('/animals', (req, res) => {
//     const userInput = req.body;
//     const animal = new animal(userInput);
//     animal
//     .save()
//     .then(animal => res.status(201).json(animal))
//     .catch(err => res.status(500).json({ msg: "Didn't work. Internal error", err }))
// })

if(process.env.NODE_ENV !== 'test'){
    const port = 8000;
    server.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}

module.exports = server;