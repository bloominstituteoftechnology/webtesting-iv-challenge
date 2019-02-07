const express = require('express');
const server = express();

const PORT = process.env.PORT || 42;

server.use(express.json());



module.exports = {
    server
}