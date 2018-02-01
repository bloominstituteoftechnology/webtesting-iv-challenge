const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
const Person = require('./person');

server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('hello world');
});

// Find all people
server.get('/people', (req, res) => {
  Person.find().then((people) => {
    if (!people.length) return res.status(404).json({
      success: false, message: 'No people exist in the database.'
    });
    res.status(200).json({success: true, people});
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ success: false, message: 'An unexpected error occurred.'});
  });
});

// Find person by ID
server.get('/people/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(404).json({success: false, message: 'Person does not exist in the database.'})
    }
    res.status(200).json({success: true, person});
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ success: false, message: 'An unexpected error occurred.'});
  })
});

// Create person
server.post('/people', (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({ success: false, message: 'First name and last name are required.'});
  }
  const person = new Person({ firstName, lastName });
  person.save().then((savedPerson) => {
    res.status(201).json({ success: true, person: savedPerson });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ success: false, message: 'An unexpected error occurred.'});
  });
});

// Update person
server.put('/people/:id', (req, res) => {
  const updates = req.body;
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(404).json({success: false, message: 'Person does not exist in the database.'})
    }
    const pendingPerson = Object.assign(person, updates);
    pendingPerson.save().then((updatedPerson) => {
      res.status(200).json({success: true, person: updatedPerson});
    });
  }).catch((err) => {
    //console.log(err);
    res.status(500).json({ success: false, message: 'An unexpected error occurred.'});
  });
});

// Delete person
server.delete('/people/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id).then((removedPerson) => {
    if (!removedPerson) {
      return res.status(404).json({success: false, message: 'Person does not exist in the database.'})
    }
    return res.status(200).json({success: true});
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ success: false, message: 'An unexpected error occurred.'});
  });
});

module.exports = server;