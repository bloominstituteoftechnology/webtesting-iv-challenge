const express = require('express');
const bodyParser = require('body-parser')
const server = express();
const Soda = require('./SodaModel')

server.use(bodyParser.json());


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