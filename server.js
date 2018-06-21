const express = require('express');
const mongoose = require('mongoose');

const User = require('./user');

const server = express();

mongoose.connect(`mongodb://localhost/testdb`)

server
    .get('/', (req, res) => {
        res.status(200).json({api: 'running'})
})

// server
//     .post('/create', (req, res) => {
//         const expectedBody = { username: "Test", password: "12345" }
//         User
//             .then(res => {
//                 res.status(200).json({ expectedBody })
//             })
//             .catch(err => {
//                 res.status(500).json({errorMsg: err})
//             })
// })

// server
//     .delete('/', (req, res) => {
//         res.status(200).json({ api: 'running' })
//     })

module.exports = server;