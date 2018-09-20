const express = require('express');

const app = express();

app.use(express.json());
let id = 1;
const todos = [];

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: id++,
    text: req.body.text,
    complete: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = app;
