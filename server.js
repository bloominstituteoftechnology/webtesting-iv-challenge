const express = require('express');
// const mongoose = require('mongoose');

const server = express();
const db = require('./data/db.js');

// const ObjectId = mongoose.Schema.Types.ObjectId;


const Todo = require('./Todo');


server.use(express.json());

db.connectTo('todoTest')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});


server.post('/api/todos', (req, res) => {
  Todo.create(req.body)
    .then(todo => {
      res.status(201).json(todo);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error saving data to the DB', error: err });
    });
});

server.get('/api/todos', (req, res) => {
  Todo.find({})
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error getting todos', error: err });
    });
});

server.get('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  Todo.findById(id)
    .then(todo => {
      res.status(200).json(todo);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error getting todos', error: err });
    });
});

server.delete('/api/todo/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(422).json({ message: 'ID not provided' });
  } else {
    Todo.findByIdAndRemove(id)
      .then(todo => {
        if (todo) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Todo not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  }
});

module.exports = server;