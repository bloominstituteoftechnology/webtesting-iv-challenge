const express = require('express');
const router = express.Router();
const db = require('./xfilesModel');

router.get('/', (req, res) => {
  db
    .getAll()
    .then(characters => res.status(200).json(characters))
    .catch(err => res.status(500).json({ error: 'could not complete request' }));
});

router.post('/', (req, res) => {
  const character = req.body;
  db
    .insert(character)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({ error: 'Could not complete the request' }));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db
    .remove(id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ error: 'Could not complete the request' }));
});

module.exports = router;
