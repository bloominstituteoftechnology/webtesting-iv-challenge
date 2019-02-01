const express = require('express');
const configMiddleware = require('../config/middleware');
const server = express();
const db = require('../data/dbConfig');

configMiddleware(server);

server.get('/', async (req, res) => {
   res.status(200).json({ message: 'sanity check' });
});

server.get('/tasks', async (req, res) => {
   const tasks = await db('tasks');
   res.status(200).json(tasks);
});

server.post('/tasks', async (req, res) => {
   const newHobbit = req.body;
   const result = await db('tasks').insert(newHobbit);
   res.status(201).json(result);
});

server.delete('/tasks/:id', async (req, res) => {
   const { id } = req.params;
   const numberDeleted = await db('tasks')
      .where({ id })
      .del();
   res.status(200).json(numberDeleted);
});
module.exports = server;
