const express = require('express');
const helmet = require('helmet')

const server = express();

server.use(express.json());
server.use(helmet())

server.get('/', (req, res) => {
  res.status(200).json({ success: true, data: { api: 'running' } });
});

server.post('/instrument', (req, res) => {
  const { instrument } = req.body;

  res.status(200).json({ "instrument": `${instrument}` });
});

server.delete('/instrument', (req, res) => {
  // console.log(req);
  res.status(200).json({"deleted": "Cello"})
})




module.exports = server;
