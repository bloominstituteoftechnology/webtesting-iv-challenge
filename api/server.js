const express = require('express');
const axios = require('axios');
const db = require('../data/dbConfig');
const configureRoutes  = require('../legos/legosModel')
const server = express();
server.use(express.json());
const cors = require('cors');
server.use(cors());


server.get('/', (req, res) => {

  res.status(200).json({ api: 'up' });
});

server.post('/addColor', (req, res) => {
  const { color } = req.body;

  res.status(200).json({ newColor: `${color}` });
});

const url = process.env.url;
server.get('/api/themes', (req, res) => {
  const route = req.route//see below for return value
  axios.get(`${url}`)
  return db('lego-themes')
    // .where({ id: 1 })
    .then(data => {
      res.status(200).json(data.route);
      // res.status(200).json({ids: id[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error finding Lego by theme', err })
    })
})

/**
 * Route {
  path: '/api/themes',
  stack:
   [ Layer {
       handle: [Function],
       name: '<anonymous>',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }
 * 
 */


module.exports = {
  server,
};







module.exports = server;