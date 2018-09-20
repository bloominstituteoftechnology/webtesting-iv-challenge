const express = require('express');
const helmet = require('helmet');

const server = express(); 

const db = require('./dbConfig.js');

server.use(helmet());
server.use(express.json());

function postChecker (req, res, next) {
  if (!( req.body && req.body.date && req.body.open && req.body.high && req.body.low && req.body.close)){
    res.status(500).json({errorMessage: "Missing required paramaters"})
  } else {
    next(); 
  }

}

server.post('/', postChecker, (req, res) => {
  const candle = req.body; 
  db.insert(candle)
    .into('usdcad')
    .then(candleId => {
      res.status(201).json(candleId);
    })
    .catch(error => {
      res.status(500).json(error); 
    }); 
});

server.delete('/:id', (req,res) => {
  db("usdcad")
    .where({ id })
    .del()
    .then(count => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(500).json({errorMessage: "Problems deleting"})
    })
});

module.exports = server; 

