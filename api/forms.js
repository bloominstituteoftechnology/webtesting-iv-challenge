const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.post('/', (req, res) => {
  db('forms').insert(req.body)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('forms').where({ id })
    .del()
    .then(count => {
      if (count === 0) {
        res.status(404).json({ message: 'Form with that ID not found.' });
      } else res.status(202).json(count);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;