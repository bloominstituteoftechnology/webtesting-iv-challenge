const express = require('express');

const db = require('../helpers/projectModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/api/projects', async (req, res) => {
  const rows = await hobbits.getAll();

  res.status(200).json(rows);
});

server.post('/api/projects', async (req, res) => {
  const project = req.body;
if (project.name) {
  const ids = await db.insert(project)
res.status(201).json(ids);
} else {
res.status(400).json({})

}
  res.status(200).json();
});




module.exports = server;
