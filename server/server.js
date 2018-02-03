const express = require('express');
const bodyParser = require('body-parser')
const server = express();
const Soda = require('./SodaModel')
const fs = require('fs');
const path = require('path')
const morgan = require('morgan')

server.use(bodyParser.json());
server.use(morgan('combined'))
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
server.use(morgan("combined", { stream: accessLogStream }));

server.get('/api/sodas', (req, res) => {
    Soda.find({}, (err, sodas) => {
        if (err) return res.send(err);
        res.status(200).json(sodas);
      });
  });
  
  server.post('/api/sodas/create', (req, res) => {
    res.status(200).json(req.body);
  });
module.exports = server;