const express = require('express');

const app = express();

app.use(express.json());
const id = 1;
const todos = [];

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

module.exports = app;
