const express = require('express');

const names = require('./data/namesModal.js')

const server = express();

server.use(express.json());

// sanity check endpoint

server.post('/api/names', async (req, res) => {
    try {
        let response = await names.insert(req.body)
        res.status(200).json(response)
      } catch(err) {
        console.log(err);
      } 
})

server.get('/api/names', async (req, res) => {
    try {
        let response = await names.get(req.params.id)
        res.status(200).json(response)
    } catch(err) {
        console.log(err);
    }
});

  server.delete('/api/names/:id', async (req, res) => {
    const {id} = req.params;
    try {
        let response = await names.remove(id)
        res.status(200).json(response)
      } catch(err) {
        console.log(err);
      } 
  });


server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' });
});

module.exports = server;