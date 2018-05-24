const express = require('express');
const server = express();
const Fries = require('./FriesModel');

server.use(express.json());

server.post('/api/fries', async (req, res) => {
  try {
    const response = await Fries.create(req.body)
    res.status(200).json(response);
  } 
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;
