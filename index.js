const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Wazzahhhhp');
})

server.get('/test', (req, res) => {
    db('test')
      .then(tests => res.status(200).json(tests))
      .catch(err => res.status(500).json(err));
  });

server.post('/test', (req, res) => {
  const { tests } = req.body;
  db('test')
    .insert(tests)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

server.delete('/test/:id', (req, res) => {
	const { testid } = req.params;
	db('test')
		.where({ testid })
		.del()
		.then(count => {
			if (count) {
				res.status(200).json({ message: `Success! ${id} deleted` });
			} else {
				res.status(404).json({ error: `Sorry! ${id} could not be deleted` });
			}
		})
		.catch(err => res.status(500).json(err));
});

server.listen(7000, () => console.log('\n Party at part 7k ')) 